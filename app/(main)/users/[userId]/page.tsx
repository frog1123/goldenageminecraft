import Threads from '@/components/threads/threads';
import { NextPage } from 'next';

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

const UserIdPage: NextPage<UserIdPageProps> = ({ params }) => {
  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Threads authorId={params.userId} />
    </div>
  );
};

export default UserIdPage;
