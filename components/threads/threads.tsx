// 'use client';

// import { FC, useEffect, useState } from 'react';
// import Thread from '@/components/threads/thread';
// import { ThreadWithAuthor } from '@/types';
// import axios from 'axios';

// const Threads: FC = () => {
//   const [threads, setThreads] = useState<ThreadWithAuthor[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchThreads = async () => {
//       try {
//         const response = await axios.get(`/api/threads?take=${10}&skip=${0}`);
//         const data = response.data;
//         setThreads(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching threads:', error);
//       }
//     };

//     fetchThreads();
//   }, []);

//   if (isLoading)
//     return (
//       <div className='text-center'>
//         <p>Loading...</p>
//       </div>
//     );

//   return <div className='grid grid-flow-row gap-2 w-full'>{threads.length > 0 && threads.map(thread => <Thread thread={thread} key={thread.id} />)}</div>;
// };

// export default Threads;

'use client';

import { FC, useEffect, useState, useRef } from 'react';
import Thread from '@/components/threads/thread';
import { ThreadWithAuthor } from '@/types';
import axios from 'axios';

const Threads: FC = () => {
  const [threads, setThreads] = useState<ThreadWithAuthor[]>([]);
  const [dontFetch, setDontFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const initalThreadCount = 10;

  const fetchMoreThreads = async () => {
    if (dontFetch) return;
    try {
      setDontFetch(true);
      const response = await axios.get(`/api/threads?take=${1}&skip=${skip + initalThreadCount}`);
      const data = response.data;
      setThreads(prevThreads => [...prevThreads, ...data]);
      setSkip(prevSkip => prevSkip + 1);
      console.log(skip, data, threads);
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
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchMoreThreads();
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
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
    <div ref={containerRef} className='grid grid-flow-row gap-2 w-full'>
      {threads.length > 0 && threads.map(thread => <Thread thread={thread} />)}
    </div>
  );
};

export default Threads;
