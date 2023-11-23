import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const replyId = searchParams.get("r");
    const voteType = searchParams.get("ty");

    const currentUser = await getServerCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
    if (!currentUser.active) return new NextResponse("Unauthorized", { status: 401 });
    if (!replyId || replyId === undefined) return new NextResponse("Reply not found", { status: 400 });
    if (!voteType) return new NextResponse("Vote type required", { status: 400 });

    const existingVote = await db.vote.findUnique({
      where: {
        authorId_threadReplyId: {
          threadReplyId: replyId,
          authorId: currentUser.id
        }
      }
    });

    if (existingVote) return new NextResponse("Vote already exists. Use patch", { status: 400 });

    if (voteType === "u") {
      await db.vote.create({
        data: {
          threadReplyId: replyId,
          authorId: currentUser.id,
          type: "UPVOTE"
        }
      });
    } else if (voteType === "d") {
      await db.vote.create({
        data: {
          threadReplyId: replyId,
          authorId: currentUser.id,
          type: "DOWNVOTE"
        }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[REPLIES_VOTE_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const voteId = searchParams.get("v");
    const voteType = searchParams.get("ty");

    const currentUser = await getServerCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
    if (!currentUser.active) return new NextResponse("Unauthorized", { status: 401 });
    if (!voteId || voteId === undefined) return new NextResponse("Vote not found", { status: 400 });
    if (!voteType) return new NextResponse("Vote type required", { status: 400 });

    const existingVote = await db.vote.findUnique({
      where: {
        id: voteId
      },
      select: {
        author: {
          select: {
            id: true
          }
        }
      }
    });

    if (!existingVote) return new NextResponse("Vote not found", { status: 400 });
    if (currentUser.id !== existingVote?.author.id) return new NextResponse("Unauthorized", { status: 400 });

    if (voteType === "u") {
      await db.vote.update({
        where: {
          id: voteId
        },
        data: {
          type: "UPVOTE"
        }
      });
    } else if (voteType === "d") {
      await db.vote.update({
        where: {
          id: voteId
        },
        data: {
          type: "DOWNVOTE"
        }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[REPLIES_VOTE_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const voteId = searchParams.get("v");

    const currentUser = await getServerCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
    if (!currentUser.active) return new NextResponse("Unauthorized", { status: 401 });
    if (!voteId || voteId === undefined) return new NextResponse("Vote not found", { status: 400 });

    const existingVote = await db.vote.findUnique({
      where: {
        id: voteId
      },
      select: {
        author: {
          select: {
            id: true
          }
        }
      }
    });

    if (!existingVote) return new NextResponse("Vote not found", { status: 400 });
    if (currentUser.id !== existingVote?.author.id) return new NextResponse("Unauthorized", { status: 400 });

    await db.vote.delete({
      where: {
        id: voteId
      }
    });

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[REPLIES_VOTE_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
