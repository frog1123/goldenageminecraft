import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const user = await db.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      name: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      bio: true,
      rank: true,
      role: true,
      plan: true
    }
  });

  const userWithEmail = { ...user, email: session.user.email };

  console.log("server user", userWithEmail);

  return userWithEmail;
};
