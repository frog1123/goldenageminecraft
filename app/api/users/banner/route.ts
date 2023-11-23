import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser || !currentUser.active) return new NextResponse("Unauthorized", { status: 401 });

    const { id, bannerUrl } = await req.json();

    if (id !== currentUser.id) return new NextResponse("Unauthorized", { status: 401 });
    if (!bannerUrl) return new NextResponse("Bad request", { status: 400 });
    if (!bannerUrl.startsWith("https://files.edgestore.dev")) return new NextResponse("Invalid image", { status: 400 });

    await db.user.update({
      where: {
        id
      },
      data: {
        bannerUrl
      }
    });

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[USERS_AVATAR_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
