import { getServerCurrentUser } from "@/lib/current-user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const currentUser = await getServerCurrentUser();

    return NextResponse.json(currentUser);
  } catch (err) {
    console.log("[CURRENT_USER_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
