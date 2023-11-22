import { db } from "@/lib/db";
import { ThreadTypeWithVotes, ThreadTypeWithoutVotes } from "@/types/threads";

interface Params {
  take: number;
  skip: number;
  userId?: string;
  authorId: string;
}

export const threadsFromAuthor = async ({ take, skip, userId, authorId }: Params) => {
  const threadsFromAuthor: ThreadTypeWithoutVotes[] = await db.thread.findMany({
    where: { authorId },
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

  if (userId !== null && userId !== undefined) {
    const threadsFromAuthorWithVotesWithSignedInVotes: ThreadTypeWithVotes[] | null = await Promise.all(
      (threadsFromAuthor || []).map(async (thread: ThreadTypeWithoutVotes) => {
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

    return threadsFromAuthorWithVotesWithSignedInVotes;
  } else {
    const threadsFromAuthorWithVotes: ThreadTypeWithVotes[] | null = await Promise.all(
      (threadsFromAuthor || []).map(async (thread: ThreadTypeWithoutVotes) => {
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

    return threadsFromAuthorWithVotes;
  }
};
