import { db } from "@/lib/db";
import { Metadata, NextPage, ResolvingMetadata } from "next";
import { getServerCurrentUser } from "@/lib/current-user";
import { ThreadExpandedSignedType, ThreadExpandedUnsignedType, ThreadVoteStats } from "@/types/threads";
import { ThreadExpanded } from "@/components/threads/thread-expanded";
import { ReplyThreadForm } from "@/components/threads/replies/reply-form";
import { ThreadReplies } from "@/components/threads/replies/thread-replies";
import { RepliesPageSwitcher } from "@/components/threads/replies/page-switcher";

interface ThreadIdPageNumPageProps {
  params: {
    threadId: string;
    pageNum: string;
  };
}

const ThreadIdPageNumPage: NextPage<ThreadIdPageNumPageProps> = async ({ params }) => {
  const currentUser = await getServerCurrentUser();
  const signedIn = !!currentUser;

  // no count yet
  const thread: Omit<Omit<ThreadExpandedSignedType, "count">, "id"> | Omit<Omit<ThreadExpandedUnsignedType, "count">, "id"> | null = await db.thread.findUnique({
    where: {
      id: params.threadId
    },
    select: {
      title: true,
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
      tags: {
        select: {
          id: true,
          name: true
        }
      },
      editedAt: true,
      createdAt: true
    }
  });

  if (!thread)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <p className="text-center">:( Thread does not exist or cannot be found</p>
      </div>
    );

  const threadReplies = await db.threadReply.count({
    where: {
      threadId: params.threadId
    }
  });

  const authorUpvotesCount = await db.vote.count({
    where: {
      thread: {
        authorId: thread.author.id
      },
      type: "UPVOTE"
    }
  });

  const authorDownvotesCount = await db.vote.count({
    where: {
      thread: {
        authorId: thread.author.id
      },
      type: "DOWNVOTE"
    }
  });

  const threadUpvotesCount = await db.vote.count({
    where: {
      threadId: params.threadId,
      type: "UPVOTE"
    }
  });

  const threadDownvotesCount = await db.vote.count({
    where: {
      threadId: params.threadId,
      type: "DOWNVOTE"
    }
  });

  const authorVoteStats: ThreadVoteStats = {
    receivedUpvotes: authorUpvotesCount,
    receivedDownvotes: authorDownvotesCount
  };

  const signedInVote = currentUser
    ? await db.vote.findUnique({
        where: {
          authorId_threadId: {
            threadId: params.threadId,
            authorId: currentUser.id
          }
        }
      })
    : null;

  const formattedThread: ThreadExpandedSignedType | ThreadExpandedUnsignedType = {
    ...thread,
    id: params.threadId,
    count: {
      upvotes: threadUpvotesCount,
      downvotes: threadDownvotesCount
    },
    signedInVote
  };

  const canEdit = thread?.author.id === currentUser?.id;

  return (
    <div className="grid grid-flow-row gap-2">
      <RepliesPageSwitcher totalReplies={threadReplies} threadId={params.threadId} />
      <ThreadExpanded thread={formattedThread} authorVoteStats={authorVoteStats} canEdit={canEdit} signedIn={signedIn} />
      <ThreadReplies threadId={params.threadId} tk={5} sk={0} />
      <ReplyThreadForm threadId={params.threadId} />
      <RepliesPageSwitcher totalReplies={threadReplies} threadId={params.threadId} />
    </div>
  );
};

export async function generateMetadata({ params }: ThreadIdPageNumPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const thread = await db.thread.findUnique({
    where: {
      id: params.threadId
    },
    select: {
      title: true,
      content: true
    }
  });

  if (!thread)
    return {
      title: "Thread",
      description: "Thread does not exist or cannot be found",
      openGraph: {
        title: "Thread",
        description: "Thread does not exist or cannot be found"
      }
    };

  return {
    title: thread.title,
    description: thread.content,
    openGraph: {
      title: thread.title,
      description: thread.content ? thread.content : ""
    }
  };
}

export default ThreadIdPageNumPage;
