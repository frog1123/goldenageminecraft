import { getServerCurrentUser } from "@/lib/current-user";
import { getServerCurrentUserId } from "@/lib/current-user-id";
import { db } from "@/lib/db";
import { threadReplies } from "@/utils/api/threads/replies/thread-replies";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get("tid");
    const _take = searchParams.get("tk");
    const _skip = searchParams.get("sk");

    const take = _take ? parseInt(_take) : null;
    const skip = _skip ? parseInt(_skip) : null;

    // dont use !
    if (take === null || skip === null) return new NextResponse("Bad request", { status: 400 });
    if (take >= 20) return new NextResponse("tk too large", { status: 400 });

    const userId = await getServerCurrentUserId();

    if (!threadId) return new NextResponse("Bad request", { status: 400 });

    return NextResponse.json(
      await threadReplies({
        take,
        skip,
        threadId,
        userId
      })
    );
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
    if (content.length === 0) return new NextResponse("Content is required", { status: 400 });
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

export async function PATCH(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { id, content } = await req.json();
    // id is replyId

    if (!id) return new NextResponse("Bad request", { status: 400 });
    if (content.length === 0) return new NextResponse("Content is required", { status: 400 });
    if (content.length >= 1000) return new NextResponse("Content too long", { status: 400 });

    const threadReply = await db.threadReply.update({
      where: {
        id
      },
      data: {
        content,
        editedAt: new Date().toISOString()
      }
    });

    return NextResponse.json(threadReply.id);
  } catch (err) {
    console.log("[THREADS_REPLIES_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
