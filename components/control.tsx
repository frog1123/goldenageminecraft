'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const Control: FC = () => {
  const router = useRouter();

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2'>
      <div>
        <input placeholder='Search' className='w-full h-full rounded-md px-2' />
      </div>
      <div className='ml-auto'>
        <Link href='/forums/threads/create'>
          <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
            <p>Create thread</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Control;
