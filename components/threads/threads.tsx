'use client';

import { FC, useEffect, useState, useRef } from 'react';
import Thread from '@/components/threads/thread';
import { ThreadWithAuthor } from '@/types';
import axios from 'axios';
import dark_spinner from '@/public/assets/dark_spinner.svg';
import light_spinner from '@/public/assets/light_spinner.svg';

const Threads: FC = () => {
  const [threads, setThreads] = useState<ThreadWithAuthor[]>([]);
  const [dontFetch, setDontFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const lastElementRef = useRef<HTMLDivElement>(null);

  const initalThreadCount = 10;
  const fetchMoreAmount = 3;

  const fetchMoreThreads = async () => {
    if (dontFetch) return;
    try {
      setDontFetch(true);
      const response = await axios.get(`/api/threads?take=${fetchMoreAmount}&skip=${skip + initalThreadCount}`);
      const data = response.data;
      setThreads(prevThreads => [...prevThreads, ...data]);
      setSkip(prevSkip => prevSkip + fetchMoreAmount);
      // console.log(skip, data, threads);
      setDontFetch(false);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`/api/threads?take=${initalThreadCount}&skip=${0}`);
        const data = response.data;
        setThreads(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  useEffect(() => {
    const container = lastElementRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchMoreThreads();
        }
      },
      { threshold: 0.01 } // Adjust the threshold as needed
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threads, skip]);

  if (isLoading)
    return (
      <div className='text-center'>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className='grid grid-flow-row gap-2 w-full'>
      {threads.length > 0 && threads.map(thread => <Thread thread={thread} />)}
      <div ref={lastElementRef} className='text-center'></div>
    </div>
  );
};

export default Threads;
