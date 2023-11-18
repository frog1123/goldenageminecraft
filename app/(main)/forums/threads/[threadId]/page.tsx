import { Separator } from "@/components/separator";
import { db } from "@/lib/db";
import { formatDateLong } from "@/utils/format-date-long";
import { Metadata, NextPage, ResolvingMetadata } from "next";
import Image from "next/image";

import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Content } from "@/components/content";
import { Link } from "@/components/link";
import { VoteBox } from "@/components/threads/vote-box";
import { getServerCurrentUser } from "@/lib/current-user";
import { Tag } from "@/components/threads/tag";
import { ThreadActions } from "@/components/threads/thread-actions";
import { ThreadExpandedSignedType, ThreadExpandedUnsignedType, ThreadVoteStats } from "@/types/threads";
import { VotesRatio } from "@/components/votes-ratio";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { rankColorMap, rankMap, roleColorMap, roleIconMap } from "@/components/users/styles";
import { ThreadExpanded } from "@/components/threads/thread-expanded";

interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage: NextPage<ThreadIdPageProps> = async ({ params }) => {
  const currentUser = await getServerCurrentUser();
  const signedIn = !!currentUser;

  let thread: ThreadExpandedSignedType | ThreadExpandedUnsignedType | null;

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
    <div>
      <ThreadExpanded thread={thread} voteStats={voteStats} canEdit={canEdit} signedIn={signedIn} />
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
