import Control from '@/components/control';
import Threads from '@/components/threads/threads';
import { NextPage } from 'next';

const ThreadsPage: NextPage = async () => {
  return (
    <>
      <Control />
      <Threads />
    </>
  );
};

export default ThreadsPage;
