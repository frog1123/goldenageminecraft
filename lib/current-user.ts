import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export const getCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const currentUser = await db.user.findUnique({
    where: {
      userId: userId
    }
  });

  return currentUser;
};
