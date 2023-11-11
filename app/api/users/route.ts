import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const password = await hash(data.password, 12);

    await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password,
        bio: ""
      }
    });
  } catch (err) {
    console.log("[USERS_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();
    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

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
