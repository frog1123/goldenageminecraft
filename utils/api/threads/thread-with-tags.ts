import { db } from "@/lib/db";
import { ThreadTypeWithVotes, ThreadTypeWithoutVotes } from "@/types/threads";

interface Params {
  take: number;
  skip: number;
  tagId: string;
  userId?: string;
}

export const threadsWithTag = async ({ take, skip, tagId, userId }: Params) => {
  const threadsWithTag: { threads: ThreadTypeWithoutVotes[] } | null = await db.tag.findUnique({
    where: { id: tagId },
    select: {
      threads: {
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
          votes: {
            where: {
              authorId: userId
            }
          },
          createdAt: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take,
        skip
      }
    }
  });

  if (userId !== null && userId !== undefined) {
    const threadsWithTagsWithVotesWithSignedInVotes: { threads: ThreadTypeWithVotes[] } | null = {
      threads: await Promise.all(
        (threadsWithTag?.threads || []).map(async thread => {
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
      )
    };

    // keep
    return threadsWithTagsWithVotesWithSignedInVotes?.threads;
  } else {
    const threadsWithTagsWithVotes: { threads: ThreadTypeWithVotes[] } | null = {
      threads: await Promise.all(
        (threadsWithTag?.threads || []).map(async thread => {
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
      )
    };

    // keep
    return threadsWithTagsWithVotes?.threads;
  }
};
