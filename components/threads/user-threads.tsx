"use client";

import { FC, useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import LoadingIcon from "@/components/loading-icon";
import { UserThread } from "@/components/threads/user-thread";
import { Context } from "@/context";
import { SkeleThread } from "@/components/threads/skele-thread";

interface UserThreadsProps {
  authorId: string;
  canEdit: boolean;
}

export const UserThreads: FC<UserThreadsProps> = ({ authorId, canEdit }) => {
  const [threads, setThreads] = useState<any[]>([]);
  const [dontFetch, setDontFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const initalDate = new Date().toISOString();
  const lastElementRef = useRef<HTMLDivElement>(null);

  const context = useContext(Context);
  const signedIn = !!context.value.currentUser?.id;

  const initalThreadCount = 5;
  const fetchMoreAmount = 3;

  useEffect(() => {
    if (context.value.deletedThread.id !== null) {
      const updatedThreads = threads.filter(thread => thread.id !== context.value.deletedThread.id);
      setThreads(updatedThreads);
      context.setValue({ ...context.value, deletedThread: { id: null } });
    }
  }, [context.value.deletedThread.id, context, threads]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const fetchLink = `/api/threads?tk=${initalThreadCount}&sk=${0}&d=${initalDate}&o=${"desc"}&a=${authorId}`;
        const response = await axios.get(fetchLink);

        const data = response.data;
        setThreads(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching threads [INITIAL]:", err);
      }
    };

    fetch();
  }, [authorId, context.value.currentUser?.id, signedIn]);

  useEffect(() => {
    const fetchMoreThreads = async () => {
      if (dontFetch) return;
      try {
        setDontFetch(true);

        const fetchLink = `/api/threads?tk=${fetchMoreAmount}&sk=${skip + initalThreadCount}&d=${initalDate}&o=${"desc"}&a=${authorId}`;
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
  }, [threads, skip, authorId, context.value.currentUser?.id, signedIn, dontFetch]);

  if (isLoading)
    return (
      <>
        <div className="grid grid-flow-row gap-2 w-full">
          <SkeleThread />
          <SkeleThread />
          <SkeleThread />
          <SkeleThread />
          <SkeleThread />
          <SkeleThread />
        </div>
        <div className="w-max mx-auto">
          <LoadingIcon />
        </div>
      </>
    );

  return (
    <div className="grid grid-flow-row gap-2 w-full">
      {threads.length > 0 && threads.map(thread => <UserThread thread={thread} key={`user-thread-${thread.id}`} canEdit={canEdit} signedIn={signedIn} />)}
      <div ref={lastElementRef} className="z-[-1] text-center w-full h-[400px] mt-[-400px]"></div>
    </div>
  );
};
