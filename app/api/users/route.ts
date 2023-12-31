import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { id, bio } = await req.json();

    if (id !== currentUser.id) return new NextResponse("Unauthorized", { status: 401 });
    if (bio.length >= 500) return new NextResponse("Bio too long", { status: 400 });

    await db.user.update({
      where: {
        id
      },
      data: {
        bio
      }
    });

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[USERS_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
