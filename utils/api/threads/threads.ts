import { db } from "@/lib/db";
import { ThreadTypeWithVotes, ThreadTypeWithoutVotes } from "@/types/threads";

interface Params {
  take: number;
  skip: number;
  userId?: string;
}

export const threads = async ({ take, skip, userId }: Params): Promise<ThreadTypeWithVotes[]> => {
  if (userId !== null && userId !== undefined) {
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
      orderBy: {
        createdAt: "desc"
      },
      take,
      skip
    });

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
            threadId_authorId: {
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
      orderBy: {
        createdAt: "desc"
      },
      take,
      skip
    });

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
