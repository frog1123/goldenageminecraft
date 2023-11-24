import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { transporter } from "@/lib/transporter";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const url = new URL(req.url);

  try {
    if (data.name.length === 0) return new NextResponse("Bad request", { status: 400 });
    if (data.email.length === 0) return new NextResponse("Bad request", { status: 400 });
    if (data.password.length === 0) return new NextResponse("Bad request", { status: 400 });

    // for testing
    const allowedUsernames = ["test1", "test2", "test3"];

    // quick testing
    const noVerifyUsernames = ["noverify1", "noverify2", "noverify3"];
    const noVerifyTrue = noVerifyUsernames.includes(data.name);

    if (!allowedUsernames.includes(data.name) && !noVerifyUsernames.includes(data.name)) {
      return new NextResponse("Invalid", { status: 409 });
    }

    const password = await hash(data.password, 12);

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

    // quick test cont
    if (noVerifyTrue) {
      const newUser = await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          password,
          bio: "",
          active: true,
          authMethod: "EMAIL"
        }
      });

      return new NextResponse("Success", { status: 200 });
    }

    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password,
        bio: "",
        active: false,
        authMethod: "EMAIL"
      }
    });

    const newToken = await db.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: newUser.id
      }
    });

    if (process.env.SEND_EMAILS === "true") {
      try {
        await transporter.sendMail({
          from: "verify@goldenageminecraft.net",
          to: data.email,
          subject: "Verify your account",
          text: `Click this link to verify your goldenageminecraft account: ${url.origin}/activate/${newToken.token}`
        });
      } catch (err) {
        console.log("[USERS_POST_NODEMAILER]", err);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("[USERS_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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
