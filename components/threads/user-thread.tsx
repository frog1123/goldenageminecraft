import { FC } from "react";
import { formatDate } from "@/utils/format-date";
import { Link } from "@/components/link";

import { Tag } from "@/components/threads/tag";
import { Content } from "@/components/content";
import { ThreadActions } from "@/components/threads/thread-actions";
import { VoteBox } from "@/components/threads/vote-box";

interface UserThreadProps {
  thread: any;
  canEdit: boolean;
  signedIn: boolean;
}

export const UserThread: FC<UserThreadProps> = ({ thread, canEdit, signedIn }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto">
      <div className="grid grid-flow-col">
        <div className="grid grid-flow-col w-max place-items-center gap-2">
          <p className="text-gray-500 text-sm">{formatDate(thread.createdAt.toString())}</p>
        </div>
        <div className="grid grid-cols-[auto_max-content] gap-2 w-max place-items-center ml-auto">
          <div className="ml-auto grid grid-flow-col gap-2">{thread.tags && thread.tags.map((tag: any) => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
          <ThreadActions canEdit={canEdit} thread={thread} />
        </div>
      </div>
      <Link href={`/forums/threads/${thread.id}`}>
        <p className="font-semibold text-lg break-words">{thread.title}</p>
      </Link>
      <Content text={thread?.content} />
      <div className="mt-1">
        <VoteBox thread={thread} signedIn={signedIn} />
      </div>
    </div>
  );
};
