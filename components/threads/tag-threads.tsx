"use client";

import { FC, useEffect, useState, useRef, useContext } from "react";
import Thread from "@/components/threads/thread";
import { ThreadType } from "@/types";
import axios from "axios";
import LoadingIcon from "@/components/loading-icon";
import { Context } from "@/context";

interface TagThreadsProps {
  tagId: string;
}

const TagThreads: FC<TagThreadsProps> = ({ tagId }) => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [dontFetch, setDontFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const lastElementRef = useRef<HTMLDivElement>(null);

  const context = useContext(Context);
  const signedIn = !!context.value.currentUser.id;

  const initalThreadCount = 1;
  const fetchMoreAmount = 3;

  useEffect(() => {
    if (context.value.deletedThread.id !== null) {
      const updatedThreads = threads.filter(thread => thread.id !== context.value.deletedThread.id);
      setThreads(updatedThreads);
      context.setValue({ ...context.value, deletedThread: { id: null } });
    }
  }, [context.value.deletedThread.id, context]);

  const fetchMoreThreads = async () => {
    if (dontFetch) return;
    try {
      setDontFetch(true);

      const withoutUserLink = `/api/threads?tk=${fetchMoreAmount}&sk=${skip + initalThreadCount}&t=${tagId}`;
      const withUserLink = `/api/threads?tk=${fetchMoreAmount}&sk=${skip + initalThreadCount}&t=${tagId}&u=${context.value.currentUser.id}`;

      let fetchLink = withoutUserLink;
      if (signedIn) fetchLink = withUserLink;
      const response = await axios.get(fetchLink);

      const data = response.data;
      setThreads(prevThreads => [...prevThreads, ...data]);
      setSkip(prevSkip => prevSkip + fetchMoreAmount);
      if (data.length === 0) {
        setDontFetch(true);
        return;
      }
      setDontFetch(false);
    } catch (err) {
      console.error("Error fetching threads [INCREMENTAL]:", err);
    }
  };

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const withoutUserLink = `/api/threads?tk=${initalThreadCount}&sk=${0}&t=${tagId}`;
        const withUserLink = `/api/threads?tk=${initalThreadCount}&sk=${0}&t=${tagId}&u=${context.value.currentUser.id}`;

        let fetchLink = withoutUserLink;
        if (signedIn) fetchLink = withUserLink;
        const response = await axios.get(fetchLink);

        const data = response.data;
        setThreads(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching threads [INITIAL]:", err);
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
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threads, skip]);

  if (isLoading)
    return (
      <div className="w-max mx-auto">
        <LoadingIcon />
      </div>
    );

  return (
    <div className="grid grid-flow-row gap-2 w-full">
      {threads.length > 0 && threads.map(thread => <Thread thread={thread} key={`tag-thread-${thread.id}`} signedIn={signedIn} />)}
      <div ref={lastElementRef} className="z-[-1] text-center w-full h-[400px] mt-[-400px]"></div>
    </div>
  );
};

export default TagThreads;
