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
      _count: {
        select: {
          threads: true
        }
      },
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user)
    return (
      <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2'>
        <p className='text-center'>:( User does not exist or cannot be found</p>
      </div>
    );

  const clerkUser = await clerkCurrentUser();

  const canEdit = user.userId === clerkUser?.id;

  return (
    <>
      <UserInfo user={user} />
      <div className='grid grid-cols-2 gap-2 place-items-center'>
        <p className='mr-auto uppercase text-xs font-bold text-zinc-500'>Activity</p>
        <p className='ml-auto uppercase text-xs font-bold text-zinc-500 '>{user._count.threads} Threads</p>
      </div>
      <UserThreads authorId={params.userId} canEdit={canEdit} />
    </>
  );
};

export default UserIdPage;
