import { db } from "@/lib/db";
import { Metadata, NextPage, ResolvingMetadata } from "next";
import { getServerCurrentUser } from "@/lib/current-user";
import { ThreadExpandedSignedType, ThreadExpandedUnsignedType, ThreadVoteStats } from "@/types/threads";
import { ThreadExpanded } from "@/components/threads/thread-expanded";
import { ReplyThreadForm } from "@/components/threads/replies/reply-form";
import { ThreadReplies } from "@/components/threads/replies/thread-replies";
import { RepliesPageSwitcher } from "@/components/threads/replies/page-switcher";

interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage: NextPage<ThreadIdPageProps> = async ({ params }) => {
  const currentUser = await getServerCurrentUser();
  const signedIn = !!currentUser;

  // no count yet
  const thread: Omit<ThreadExpandedSignedType, "count"> | Omit<ThreadExpandedUnsignedType, "count"> | null = await db.thread.findUnique({
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

  let voteStats: ThreadVoteStats = {
    receivedUpvotes: 0,
    receivedDownvotes: 0
  };

  const authorUpvoteCount = await db.thread.findMany({
    where: {
      authorId: thread?.author.id
    },
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
    where: {
      authorId: thread?.author.id
    },
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

  const signedInVote = thread?.author.id
    ? await db.vote.findUnique({
        where: {
          threadId_authorId: {
            threadId: params.threadId,
            authorId: thread?.author.id
          }
        }
      })
    : null;

  console.log(authorUpvoteCount, authorDownvoteCount);

  authorUpvoteCount.forEach(thread => {
    voteStats.receivedUpvotes += thread._count.votes;
  });

  authorDownvoteCount.forEach(thread => {
    voteStats.receivedDownvotes += thread._count.votes;
  });

  const formattedThread: ThreadExpandedSignedType | ThreadExpandedUnsignedType = {
    ...thread,
    count: {
      upvotes: voteStats.receivedUpvotes,
      downvotes: voteStats.receivedDownvotes
    },
    signedInVote
  };

  const canEdit = thread?.author.id === currentUser?.id;

  return (
    <div className="grid grid-flow-row gap-2">
      <RepliesPageSwitcher totalReplies={threadReplies} threadId={params.threadId} />
      <ThreadExpanded thread={formattedThread} voteStats={voteStats} canEdit={canEdit} signedIn={signedIn} />
      <ThreadReplies threadId={params.threadId} tk={5} sk={0} />
      <ReplyThreadForm threadId={params.threadId} />
      <RepliesPageSwitcher totalReplies={threadReplies} threadId={params.threadId} />
    </div>
  );
};

export async function generateMetadata({ params }: ThreadIdPageProps, parent: ResolvingMetadata): Promise<Metadata> {
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

export default ThreadIdPage;
