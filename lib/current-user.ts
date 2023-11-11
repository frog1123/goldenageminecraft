import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { CurrentUserType } from "@/types";

export const getServerCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const user: CurrentUserType | null = await db.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      bio: true,
      rank: true,
      role: true,
      plan: true,
      active: true
    }
  });

  if (!user) return null;
  const userWithEmail = { ...user, email: session.user.email };

  console.log("server user", userWithEmail);

  return userWithEmail;
};
