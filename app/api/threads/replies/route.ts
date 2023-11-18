import { getServerCurrentUser } from "@/lib/current-user";
import { getServerCurrentUserId } from "@/lib/current-user-id";
import { db } from "@/lib/db";
import { ThreadReplySignedType, ThreadReplyUnsignedType } from "@/types/threads";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get("tid");
    const take = searchParams.get("tk");
    const skip = searchParams.get("sk");

    const userId = await getServerCurrentUserId();

    if (!threadId) return new NextResponse("Bad request", { status: 400 });

    let threadReplies: ThreadReplySignedType[] | ThreadReplyUnsignedType[] | null;

    if (userId) {
      threadReplies = await db.threadReply.findMany({
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
          upvotes: {
            where: {
              authorId: userId
            }
          },
          downvotes: {
            where: {
              authorId: userId
            }
          },
          _count: {
            select: {
              upvotes: true,
              downvotes: true
            }
          },
          createdAt: true
        },

        orderBy: {
          createdAt: "desc"
        },
        take: take ? parseInt(take) : 0,
        skip: skip ? parseInt(skip) : 0
      });
    } else {
      threadReplies = await db.threadReply.findMany({
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
          _count: {
            select: {
              upvotes: true,
              downvotes: true
            }
          },
          createdAt: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take: take ? parseInt(take) : 0,
        skip: skip ? parseInt(skip) : 0
      });
    }

    return NextResponse.json(threadReplies);
  } catch (err) {
    console.log("[THREADS_REPLIES_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { threadId, content } = await req.json();

    if (!threadId) return new NextResponse("Bad request", { status: 400 });
    if (content.length >= 1000) return new NextResponse("Content too long", { status: 400 });

    const threadReply = await db.threadReply.create({
      data: {
        content,
        authorId: currentUser.id,
        threadId
      }
    });

    return NextResponse.json(threadReply.id);
  } catch (err) {
    console.log("[THREADS_REPLIES_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
