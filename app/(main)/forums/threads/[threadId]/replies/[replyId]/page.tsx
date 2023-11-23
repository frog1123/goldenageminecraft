import { ThreadReply } from "@/components/threads/replies/thread-reply";
import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { OmitAuthorVotes, ThreadExpandedUnsignedType, ThreadReplySignedType } from "@/types/threads";
import { NextPage } from "next";

interface ReplyIdPageProps {
  params: {
    threadId: string;
    replyId: string;
  };
}

const ReplyIdPage: NextPage<ReplyIdPageProps> = async ({ params }) => {
  const currentUser = await getServerCurrentUser();

  const tempReply = await db.threadReply.findFirst({
    where: {
      id: params.replyId
    },
    select: {
      createdAt: true
    }
  });

  const replyCreatedAt = tempReply?.createdAt;

  const position = await db.threadReply.count({
    where: {
      threadId: params.threadId,
      createdAt: {
        lte: replyCreatedAt
      }
    }
  });

  const reply: OmitAuthorVotes<Omit<Omit<ThreadReplySignedType, "count">, "signedInVote">> | null = await db.threadReply.findUnique({
    where: {
      id: params.replyId
    },
    select: {
      id: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
          rank: true,
          role: true,
          plan: true,
          _count: {
            select: {
              threads: true
            }
          },
          createdAt: true
        }
      },
      editedAt: true,
      createdAt: true
    }
  });

  if (!reply)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <p className="text-center">:( Reply does not exist or cannot be found</p>
      </div>
    );

  let authorRecievedUpvotes = 0;
  let authorRecievedDownvotes = 0;

  const authorUpvoteCount = await db.thread.findMany({
    select: {
      _count: {
        select: {
          votes: {
            where: {
              type: "UPVOTE"
            }
          }
        }
      }
    }
  });

  const authorDownvoteCount = await db.thread.findMany({
    select: {
      _count: {
        select: {
          votes: {
            where: {
              type: "UPVOTE"
            }
          }
        }
      }
    }
  });

  authorUpvoteCount.forEach(thread => {
    authorRecievedUpvotes += thread._count.votes;
  });

  authorDownvoteCount.forEach(thread => {
    authorRecievedDownvotes += thread._count.votes;
  });

  const formattedReply = {
    ...reply,
    author: {
      ...reply.author,
      votes: {
        upvotes: authorRecievedUpvotes,
        downvotes: authorRecievedDownvotes
      }
    },
    count: {
      upvotes: 0,
      downvotes: 0
    },
    signedInVote: null
  };

  return (
    <div>
      <ThreadReply threadId={params.threadId} reply={formattedReply} currentUser={currentUser} replyNum={position} signedIn={!!currentUser} />
    </div>
  );
};

export default ReplyIdPage;
