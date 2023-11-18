"use client";

import { FC, useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import LoadingIcon from "@/components/loading-icon";
import { Context } from "@/context";
import { ThreadReplySignedType, ThreadReplyUnsignedType } from "@/types/threads";
import { ThreadReply } from "@/components/threads/replies/thread-reply";

interface ThreadRepliesProps {
  threadId: string;
  tk: number;
  sk: number;
}

export const ThreadReplies: FC<ThreadRepliesProps> = ({ threadId, tk, sk }) => {
  const [replies, setReplies] = useState<ThreadReplySignedType[] | ThreadReplyUnsignedType[]>([]);
  const [dontFetch, setDontFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const lastElementRef = useRef<HTMLDivElement>(null);

  const context = useContext(Context);

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
        const withoutUserLink = `/api/threads/replies?tid=${threadId}&tk=${tk}&sk=${sk}`;
        let fetchLink = withoutUserLink;

        const response = await axios.get(fetchLink);

        const data = response.data;
        setReplies(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching threads [INITIAL]:", err);
      }
    };

    fetchThreads();
  }, [context.value.currentUser?.id]);

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
      {replies.length > 0 && replies.map(reply => <ThreadReply reply={reply} currentUser={context.value.currentUser} key={`reply-${reply.id}`} />)}
    </div>
  );
};
