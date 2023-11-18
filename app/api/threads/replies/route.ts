import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
