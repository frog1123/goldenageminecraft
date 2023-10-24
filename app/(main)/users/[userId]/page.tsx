import Threads from '@/components/threads/threads';
import UserInfo from '@/components/users/user-info';
import { NextPage } from 'next';

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

const UserIdPage: NextPage<UserIdPageProps> = ({ params }) => {
  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <UserInfo />
      <Threads authorId={params.userId} />
    </div>
  );
};

export default UserIdPage;
