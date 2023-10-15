import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { User } from '@prisma/client';

export const getInitalUser = async (): Promise<User> => {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirectToSignIn();

  const existingUser = await db.user.findUnique({
    where: {
      userId: clerkUser.id
    }
  });

  if (existingUser) return existingUser;

  const newUser = await db.user.create({
    data: {
      userId: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      imageUrl: clerkUser.imageUrl,
      email: clerkUser.emailAddresses[0].emailAddress
    }
  });

  return newUser;
};
