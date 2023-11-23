import { db } from "@/lib/db";
import { OmitAuthorVotes, ThreadExpandedUnsignedType, ThreadReplySignedType, ThreadReplyUnsignedType } from "@/types/threads";

interface Params {
  take: number;
  skip: number;
  threadId: string;
  userId: string | null;
}

export const threadReplies = async ({ take, skip, threadId, userId }: Params): Promise<ThreadReplySignedType[] | ThreadReplyUnsignedType[]> => {
  // no count yet
  const replies: OmitAuthorVotes<Omit<Omit<ThreadReplySignedType, "count">, "signedInVote">>[] = await db.threadReply.findMany({
    where: {
      threadId
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
    },
    orderBy: {
      createdAt: "asc"
    },
    take,
    skip
  });

  // TODO add votes if signed in
  if (userId !== null && userId !== undefined) {
    const repliesWithUserRep: ThreadReplySignedType[] | ThreadReplyUnsignedType[] = await Promise.all(
      (replies || []).map(async reply => {
        let authorRecievedUpvotes = 0;
        let authorRecievedDownvotes = 0;

        const authorUpvotesCount = await db.vote.count({
          where: {
            thread: {
              authorId: reply.author.id
            },
            type: "UPVOTE"
          }
        });

        const authorDownvotesCount = await db.vote.count({
          where: {
            thread: {
              authorId: reply.author.id
            },
            type: "DOWNVOTE"
          }
        });

        const replyUpvotesCount = await db.vote.count({
          where: {
            threadReplyId: reply.id,
            type: "UPVOTE"
          }
        });

        const replyDownvotesCount = await db.vote.count({
          where: {
            threadReplyId: reply.id,
            type: "DOWNVOTE"
          }
        });

        const signedInVote = await db.vote.findUnique({
          where: {
            authorId_threadReplyId: {
              threadReplyId: reply.id,
              authorId: userId
            }
          }
        });

        return {
          ...reply,
          author: {
            ...reply.author,
            votes: {
              upvotes: authorRecievedUpvotes,
              downvotes: authorRecievedDownvotes
            }
          },
          count: {
            upvotes: replyUpvotesCount,
            downvotes: replyDownvotesCount
          },
          signedInVote
        };
      })
    );

    // keep
    return repliesWithUserRep;
  } else {
    const repliesWithUserRep: ThreadReplySignedType[] | ThreadReplyUnsignedType[] = await Promise.all(
      (replies || []).map(async reply => {
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

        return {
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
      })
    );

    // keep
    return repliesWithUserRep;
  }
};
