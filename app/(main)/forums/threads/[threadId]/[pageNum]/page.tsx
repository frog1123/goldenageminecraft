import { db } from "@/lib/db";
import { Metadata, NextPage, ResolvingMetadata } from "next";
import { getServerCurrentUser } from "@/lib/current-user";
import { ThreadExpandedSignedType, ThreadExpandedUnsignedType, ThreadVoteStats } from "@/types/threads";
import { ThreadExpanded } from "@/components/threads/thread-expanded";
import { ReplyThreadForm } from "@/components/threads/replies/reply-form";
import { ThreadReplies } from "@/components/threads/replies/thread-replies";
import { isPositiveWholeNumber } from "@/utils/is-positive-whole";
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

  let thread: ThreadExpandedSignedType | ThreadExpandedUnsignedType | null;

  if (!isPositiveWholeNumber(params.pageNum)) return <p>invalid page number</p>;

  if (signedIn) {
    thread = await db.thread.findUnique({
      where: {
        id: params.threadId
      },
      include: {
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
            threads: {
              select: {
                _count: {
                  select: {
                    upvotes: true,
                    downvotes: true
                  }
                }
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
        upvotes: {
          where: {
            authorId: currentUser.id
          }
        },
        downvotes: {
          where: {
            authorId: currentUser.id
          }
        },
        _count: {
          select: {
            upvotes: true,
            downvotes: true
          }
        }
      }
    });
  } else {
    thread = await db.thread.findUnique({
      where: {
        id: params.threadId
      },
      include: {
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
            threads: {
              select: {
                _count: {
                  select: {
                    upvotes: true,
                    downvotes: true
                  }
                }
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
        _count: {
          select: {
            upvotes: true,
            downvotes: true
          }
        }
      }
    });
  }

  const threadReplies = await db.threadReply.count({
    where: {
      threadId: params.threadId
    }
  });

  let voteStats: ThreadVoteStats = {
    receivedUpvotes: 0,
    receivedDownvotes: 0
  };

  thread?.author?.threads.forEach(thread => {
    voteStats.receivedUpvotes += thread._count.upvotes;
    voteStats.receivedDownvotes += thread._count.downvotes;
  });

  const canEdit = thread?.author.id === currentUser?.id;

  if (!thread)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <p className="text-center">:( Thread does not exist or cannot be found</p>
      </div>
    );

  return (
    <div className="grid grid-flow-row gap-2">
      <RepliesPageSwitcher totalReplies={threadReplies} threadId={params.threadId} />
      <ThreadExpanded thread={thread} voteStats={voteStats} canEdit={canEdit} signedIn={signedIn} />
      <ThreadReplies threadId={params.threadId} tk={5} sk={(parseInt(params.pageNum) - 1) * 5} />
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
