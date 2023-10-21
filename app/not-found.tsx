import { NextPage } from 'next';
import Image from 'next/image';
import Link from '@/components/link';
import grass_block_old from '@/public/assets/grass_block_old.png';

const NotFoundPage: NextPage = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='grid place-items-center gap-2'>
        <div className='w-40 h-40 float-animation'>
          <Image src={grass_block_old} alt='logo' />
        </div>
        <p>Page not found :(</p>
        <Link href='/'>
          <div className='hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-max'>Return home?</div>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
