import { UserThreads } from '@/components/threads/user-threads';
import UserInfo from '@/components/users/user-info';
import { db } from '@/lib/db';
import { NextPage } from 'next';
import { currentUser as clerkCurrentUser } from '@clerk/nextjs';

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

const UserIdPage: NextPage<UserIdPageProps> = async ({ params }) => {
  const user = await db.user.findUnique({
    where: {
      id: params.userId
    },
    select: {
      id: true,
      userId: true,
      name: true,
      firstName: true,
      lastName: true,
      bio: true,
      imageUrl: true,
      rank: true,
      role: true,
      plan: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user)
    return (
      <div>
        <p>user not found</p>
      </div>
    );

  const clerkUser = await clerkCurrentUser();

  const canEdit = user.userId === clerkUser?.id;

  return (
    <>
      <UserInfo user={user} />
      <UserThreads authorId={params.userId} canEdit={canEdit} />
    </>
  );
};

export default UserIdPage;
