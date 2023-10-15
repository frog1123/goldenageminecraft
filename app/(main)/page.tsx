import Threads from '@/components/threads/threads';
import { NextPage } from 'next';

const Home: NextPage = async () => {
  return (
    <div>
      <Threads />
    </div>
  );
};

export default Home;
