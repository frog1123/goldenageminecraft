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
import { ThreadVoteStats } from "@/types/threads";
import { VotesRatio } from "@/components/votes-ratio";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { rankColorMap, rankMap, roleColorMap, roleIconMap } from "@/components/users/styles";

interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage: NextPage<ThreadIdPageProps> = async ({ params }) => {
  const currentUser = await getServerCurrentUser();
  const signedIn = !!currentUser;

  let thread;

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
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-flow-row gap-2">
      <div className="grid grid-cols-[auto_max-content] gap-2">
        <div className="grid grid-cols-[max-content_max-content_auto] gap-2">
          <div className="grid grid-flow-row gap-2 place-items-center">
            <div className="w-28 h-28 rounded-md overflow-hidden relative">
              {thread.author.imageUrl ? <Image src={thread.author.imageUrl} fill alt="author" /> : <Image src={defaultUserProfilePicture()} fill alt="author" />}
            </div>
            <div className="grid grid-flow-row gap-0 place-items-center">
              <Link href={`/users/${thread.author.id}`} className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md">
                <p className="font-semibold">{thread.author.name}</p>
              </Link>
              {(thread.author.firstName || thread.author.lastName) && (
                <p className="font-semibold">
                  {thread.author.firstName && <span>{thread.author.firstName}</span>} {thread.author.lastName && <span>{thread.author.lastName}</span>}
                </p>
              )}
            </div>
            <p className="uppercase text-xs font-bold text-zinc-500">Joined {formatDateLong(thread.author.createdAt.toString())}</p>
            <div className="w-full my-1">
              <VotesRatio votesStats={voteStats} expanded />
            </div>
            <p className="uppercase text-xs font-bold text-zinc-500">{thread.author._count.threads} Threads</p>
            <div className="w-full rounded-md overflow-hidden">
              <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", rankColorMap[thread.author.rank])}>
                <div className="w-6 h-6 overflow-hidden relative">{rankMap[thread.author.rank]}</div>
                <span className="mr-auto font-semibold text-white">{thread.author.rank}</span>
              </div>
              {thread.author.role !== "USER" && (
                <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", roleColorMap[thread.author.role])}>
                  <div className="w-6 h-6 overflow-hidden relative">{roleIconMap[thread.author.role]}</div>
                  <span className="mr-auto font-semibold text-white">{thread.author.role}</span>
                </div>
              )}
              {thread.author.plan === "PREMIUM" && (
                <div className="grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center bg-pink-500 p-1">
                  <div className="w-6 h-6 overflow-hidden relative">
                    <Crown className="text-white" />
                  </div>
                  <span className="mr-auto font-semibold text-white">{thread.author.plan}</span>
                </div>
              )}
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="overflow-hidden grid grid-rows-[max-content_max-content_auto]">
            <div className="grid grid-flow-col place-items-center">
              <div className="mr-auto grid grid-flow-col place-items-center gap-2">
                <p className="uppercase text-xs font-bold text-zinc-500">Posted {formatDateLong(thread.createdAt.toString())}</p>
                {thread.editedAt && <p className="uppercase text-xs font-bold text-zinc-500">Edited {formatDateLong(thread.editedAt.toString())}</p>}
              </div>
              <div className="ml-auto">
                <ThreadActions thread={thread} canEdit={canEdit} />
              </div>
            </div>
            <p className="font-semibold text-lg">{thread.title}</p>
            <Content text={thread?.content} />
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="grid grid-flow-col">
        <VoteBox thread={thread} signedIn={signedIn} />
        <div className="ml-auto grid grid-flow-col gap-2">{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
      </div>
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
