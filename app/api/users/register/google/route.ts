import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log(data);

  try {
    if (data.name.length === 0) return new NextResponse("Bad request", { status: 400 });
    if (data.email.length === 0) return new NextResponse("Bad request", { status: 400 });

    const existingUserName = await db.user.findUnique({
      where: {
        name: data.name
      }
    });
    if (existingUserName) return new NextResponse("Username is already in use", { status: 409 });

    const existingUserEmail = await db.user.findUnique({
      where: {
        email: data.email
      }
    });
    if (existingUserEmail) return new NextResponse("Email is already in use", { status: 409 });

    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: null,
        bio: "",
        active: true,
        authMethod: "GOOGLE"
      }
    });

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[USERS_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
