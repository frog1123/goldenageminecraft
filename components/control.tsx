import Link from '@/components/link';
import { FC } from 'react';

const Control: FC = () => {
  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2'>
      <div>
        <input
          placeholder='Search (wip)'
          className='w-full h-full bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md'
        />
      </div>
      <div className='ml-auto'>
        <Link href='/forums/threads/create'>
          <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-full'>
            <p>Create thread</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Control;
