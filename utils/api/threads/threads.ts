import { db } from "@/lib/db";
import { ThreadTypeWithVotes, ThreadTypeWithoutVotes } from "@/types/threads";

interface Params {
  take: number;
  skip: number;
  dateFetched: string;
  dateSortOrder: "asc" | "desc";
  userId?: string;
}

export const threads = async ({ take, skip, dateFetched, dateSortOrder, userId }: Params): Promise<ThreadTypeWithVotes[]> => {
  const threads: ThreadTypeWithoutVotes[] = await db.thread.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tags: {
        select: {
          id: true,
          name: true
        }
      },
      author: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          rank: true,
          role: true,
          plan: true
        }
      },
      createdAt: true
    },
    where: {
      createdAt: {
        lte: dateFetched
      }
    },
    orderBy: {
      createdAt: dateSortOrder
    },
    take,
    skip
  });

  if (userId !== null && userId !== undefined) {
    const threadsWithVotesWithSignedInVote: ThreadTypeWithVotes[] | null = await Promise.all(
      (threads || []).map(async (thread: ThreadTypeWithoutVotes) => {
        const upvotesCount = await db.vote.count({
          where: {
            threadId: thread.id,
            type: "UPVOTE"
          }
        });

        const downvotesCount = await db.vote.count({
          where: {
            threadId: thread.id,
            type: "DOWNVOTE"
          }
        });

        const signedInVote = await db.vote.findUnique({
          where: {
            authorId_threadId: {
              threadId: thread.id,
              authorId: userId
            }
          }
        });

        return {
          ...thread,
          count: {
            upvotes: upvotesCount,
            downvotes: downvotesCount
          },
          signedInVote
        };
      })
    );

    return threadsWithVotesWithSignedInVote;
  } else {
    const threadsWithVotes: ThreadTypeWithVotes[] | null = await Promise.all(
      (threads || []).map(async (thread: ThreadTypeWithoutVotes) => {
        const upvotesCount = await db.vote.count({
          where: {
            threadId: thread.id,
            type: "UPVOTE"
          }
        });

        const downvotesCount = await db.vote.count({
          where: {
            threadId: thread.id,
            type: "DOWNVOTE"
          }
        });

        return {
          ...thread,
          count: {
            upvotes: upvotesCount,
            downvotes: downvotesCount
          }
        };
      })
    );

    return threadsWithVotes;
  }
};
