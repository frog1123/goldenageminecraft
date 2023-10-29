import { FC } from 'react';
import Link from '@/components/link';

export const Subnav: FC = () => {
  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 p-2 sm:rounded-md'>
      <div className='grid grid-flow-col gap-2 place-items-center w-max'>
        <Link href='/'>
          <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
            <p className='text-white'>Home</p>
          </button>
        </Link>
        <Link href='/forums'>
          <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
            <p className='text-white'>Forums</p>
          </button>
        </Link>
        <Link href='/rules'>
          <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
            <p className='text-white'>Rules</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
