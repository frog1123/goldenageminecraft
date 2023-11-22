import { db } from "@/lib/db";

interface Params {
  take: number;
  skip: number;
  threadId: string;
  userId?: string;
}

export const threadReplies = async ({ take, skip, threadId, userId }: Params) => {
  const threadReplies = await db.threadReply.findMany({
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
};
