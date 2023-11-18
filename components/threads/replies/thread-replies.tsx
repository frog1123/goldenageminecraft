"use client";

import { FC, useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import LoadingIcon from "@/components/loading-icon";
import { Context } from "@/context";

interface ThreadRepliesProps {
  threadId: string;
}

export const ThreadReplies: FC<ThreadRepliesProps> = ({ threadId }) => {
  const [replies, setReplies] = useState<any>([]);
  const [dontFetch, setDontFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const lastElementRef = useRef<HTMLDivElement>(null);

  const context = useContext(Context);

  const signedIn = !!context.value.currentUser?.id;

  const initalReplyCount = 5;
  const fetchMoreAmount = 3;

  // useEffect(() => {
  //   if (context.value.deletedThread.id !== null) {
  //     const updatedThreads = threads.filter(thread => thread.id !== context.value.deletedThread.id);
  //     setThreads(updatedThreads);
  //     context.setValue({ ...context.value, deletedThread: { id: null } });
  //   }
  // }, [context.value.deletedThread.id, context, threads]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const withoutUserLink = `/api/threads/replies?tid=${threadId}&tk=${initalReplyCount}&sk=${0}`;
        const withUserLink = `/api/threads/replies?tid=${threadId}&tk=${initalReplyCount}&sk=${0}&u=${context.value.currentUser?.id}`;

        let fetchLink = withoutUserLink;
        if (signedIn) fetchLink = withUserLink;
        const response = await axios.get(fetchLink);

        const data = response.data;
        setReplies(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching threads [INITIAL]:", err);
      }
    };

    fetchThreads();
  }, [context.value.currentUser?.id, signedIn]);

  useEffect(() => {
    const fetchMoreThreads = async () => {
      if (dontFetch) return;
      try {
        setDontFetch(true);

        const withoutUserLink = `/api/threads/replies?tid=${threadId}&tk=${fetchMoreAmount}&sk=${skip + initalReplyCount}`;
        const withUserLink = `/api/threads/replies?tid=${threadId}&tk=${fetchMoreAmount}&sk=${skip + initalReplyCount}&u=${context.value.currentUser?.id}`;

        let fetchLink = withoutUserLink;
        if (signedIn) fetchLink = withUserLink;
        const response = await axios.get(fetchLink);

        const data = response.data;

        // TODO change later
        setReplies((prevReplies: any) => [...prevReplies, ...data]);
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
  }, [replies, skip, context.value.currentUser?.id, signedIn, dontFetch]);

  if (isLoading)
    return (
      <>
        <div className="grid grid-flow-row gap-2 w-full">
          <p>loading...</p>
        </div>
        <div className="w-max mx-auto">
          <LoadingIcon />
        </div>
      </>
    );

  return (
    <div className="grid grid-flow-row gap-2 w-full">
      {replies.length > 0 && replies.map((reply: any) => <div>{reply.id}</div>)}
      <div ref={lastElementRef} className="z-[-1] text-center w-full h-[400px] mt-[-400px]"></div>
    </div>
  );
};
