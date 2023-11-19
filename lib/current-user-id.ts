import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export const getServerCurrentUserId = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const user: { id: string } | null = await db.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true
    }
  });

  if (!user) return null;

  return user.id;
};
