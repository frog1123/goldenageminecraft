import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400
    });
  }

  // Get the ID and type
  // const { id } = evt.data;

  const parsedBody = JSON.parse(body);

  if (evt.type === "user.created") {
    const primaryEmailAddress = parsedBody.data.email_addresses.find((email: any) => email.id === parsedBody.data.primary_email_address_id);

    try {
      await db.user.create({
        data: {
          userId: parsedBody.data.id,
          firstName: parsedBody.data.first_name,
          lastName: parsedBody.data.last_name,
          name: parsedBody.data.username ? parsedBody.data.username : parsedBody.data.id,
          email: primaryEmailAddress.email_address,
          imageUrl: parsedBody.data.image_url,
          bio: ""
        }
      });
    } catch (err) {
      console.error("[USER_CREATED] error");
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  if (evt.type === "user.updated") {
    const primaryEmailAddress = parsedBody.data.email_addresses.find((email: any) => email.id === parsedBody.data.primary_email_address_id);

    try {
      await db.user.update({
        where: {
          userId: parsedBody.data.id
        },
        data: {
          name: parsedBody.data.username,
          firstName: parsedBody.data.first_name,
          lastName: parsedBody.data.last_name,
          email: primaryEmailAddress.email_address,
          imageUrl: parsedBody.data.image_url
        }
      });
    } catch (err) {
      console.error("[USER_UPDATED] error");
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  if (evt.type === "user.deleted") {
    try {
      await db.user.delete({
        where: {
          userId: parsedBody.data.id
        }
      });
    } catch (err) {
      console.error("[USER_DELETED] error");
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  return new Response("", { status: 201 });
}
