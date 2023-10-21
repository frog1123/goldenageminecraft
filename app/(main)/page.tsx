import { NextPage } from 'next';
import Link from '@/components/link';

const Home: NextPage = async () => {
  return (
    <div className='grid grid-flow-row gap-2 w-[60%] mx-auto'>
      <div className='bg-neutral-200 dark:bg-neutral-900 p-2 rounded-md'>
        <Link href='/forums'>
          <div className='hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-max'>forums</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
