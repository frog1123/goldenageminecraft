'use client';

import { FC, useEffect, useState } from 'react';
import Thread from '@/components/threads/thread';
import { ThreadWithAuthor } from '@/types';
import axios from 'axios';

const Threads: FC = () => {
  const [threads, setThreads] = useState<ThreadWithAuthor[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const data: ThreadWithAuthor[] = await axios.get(`/api/threads`, { params: { take: 10, skip: 0 } });

      // setThreads(data);
    };

    fetchThreads();
  }, []);

  console.log(threads);

  return (
    <div className='grid grid-flow-row gap-2 w-full'>
      {threads.map(thread => (
        <Thread thread={thread} key={thread.id} />
      ))}
    </div>
  );
};

export default Threads;
