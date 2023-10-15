import { db } from '@/lib/db';
import { FC } from 'react';
import Thread from '@/components/threads/thread';
import { ThreadWithAuthor } from '@/types';

const Threads: FC = async () => {
  const threads: ThreadWithAuthor[] = await db.thread.findMany({
    include: {
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className='grid grid-flow-row gap-2 w-full'>
      {threads.map(thread => (
        <Thread thread={thread} key={thread.id} />
      ))}
    </div>
  );
};

export default Threads;
