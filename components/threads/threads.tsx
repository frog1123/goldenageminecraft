import { db } from '@/lib/db';
import { FC } from 'react';

const Threads: FC = async () => {
  const threads = await db.thread.findMany({});

  return (
    <div>
      threads
      <div>
        {threads.map(thread => (
          <div>{thread.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Threads;
