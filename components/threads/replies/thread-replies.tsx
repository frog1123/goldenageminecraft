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
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(Context);

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
        console.error("Error fetching replies:", err);
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

  if (replies.length === 0)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-flow-row gap-2">
        <p className="text-center">No replies found</p>
      </div>
    );

  return (
    <div className="grid grid-flow-row gap-2 w-full">
      {replies.length > 0 &&
        replies.map((reply, index) => (
          <ThreadReply threadId={threadId} reply={reply} currentUser={context.value.currentUser} replyNum={sk + index + 1} key={`reply-${reply.id}`} />
        ))}
    </div>
  );
};
