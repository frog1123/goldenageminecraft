'use client';

import { FC, useEffect, useState } from 'react';
import Thread from '@/components/threads/thread';
import { ThreadWithAuthor } from '@/types';
import axios from 'axios';

const Threads: FC = () => {
  const [threads, setThreads] = useState<ThreadWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`/api/threads?take=${10}&skip=${0}`);
        const data = response.data;
        setThreads(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  if (isLoading)
    return (
      <div className='text-center'>
        <p>Loading...</p>
      </div>
    );

  return <div className='grid grid-flow-row gap-2 w-full'>{threads.length > 0 && threads.map(thread => <Thread thread={thread} key={thread.id} />)}</div>;
};

export default Threads;
