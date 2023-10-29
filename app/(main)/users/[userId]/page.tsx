import { Subnav } from '@/components/navbar/subnav';
import { UserThreads } from '@/components/threads/user-threads';
import UserInfo from '@/components/users/user-info';
import { db } from '@/lib/db';
import { NextPage } from 'next';

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

  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Subnav />
      <UserInfo user={user} />
      <UserThreads authorId={params.userId} />
    </div>
  );
};

export default UserIdPage;
