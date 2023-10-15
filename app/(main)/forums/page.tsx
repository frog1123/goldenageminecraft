import Control from '@/components/control';
import Threads from '@/components/threads/threads';
import { NextPage } from 'next';

const Home: NextPage = async () => {
  return (
    <div className='grid grid-flow-row gap-2 w-[40%] mx-auto'>
      <Control />
      <Threads />
    </div>
  );
};

export default Home;
