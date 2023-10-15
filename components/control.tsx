'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

const Control: FC = () => {
  const router = useRouter();

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 rounded-md p-2'>
      <input placeholder='search' />
      <button onClick={() => router.push('/threads/create')}>Create thread</button>
    </div>
  );
};

export default Control;
