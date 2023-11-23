import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { imageUrl } = await req.json();

    if (!imageUrl) return new NextResponse("Bad request", { status: 400 });
    if (!imageUrl.startsWith("https://files.edgestore.dev")) return new NextResponse("Invalid image", { status: 400 });

    await db.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        imageUrl
      }
    });

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[USERS_AVATAR_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    await db.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        imageUrl: null
      }
    });

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[USER_AVATAR_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
