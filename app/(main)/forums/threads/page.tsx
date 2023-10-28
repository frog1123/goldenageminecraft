import Control from '@/components/control';
import Threads from '@/components/threads/threads';
import { NextPage } from 'next';

const ThreadsPage: NextPage = async () => {
  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Control />
      <Threads />
    </div>
  );
};

export default ThreadsPage;
