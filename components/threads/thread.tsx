import { FC } from "react";
import { formatDate } from "@/utils/format-date";
import { Link } from "@/components/link";
import { Crown, Dot } from "lucide-react";
import Image from "next/image";

import { Tag } from "@/components/threads/tag";
import { Content } from "@/components/content";
import { ThreadActions } from "@/components/threads/thread-actions";
import { VoteBox } from "@/components/threads/vote-box";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { UserPlan } from "@prisma/client";
import { rankMap, roleIconMapColored } from "@/components/users/styles";
import { ThreadType } from "@/types/threads";
import { CurrentUserType } from "@/types/users";
interface ThreadProps {
  thread: ThreadType;
  signedIn: boolean;
  currentUser: CurrentUserType | null;
}

const Thread: FC<ThreadProps> = ({ thread, signedIn, currentUser }) => {
  const canEdit = currentUser?.id === thread.author.id;

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto">
      <div className="grid grid-flow-col">
        <div className="grid grid-flow-col w-max place-items-center">
          <Link href={`/users/${thread.author.id}`}>
            <div className="grid grid-flow-col place-items-center gap-1 bg-neutral-300 dark:bg-neutral-800 p-1 rounded-md">
              <div className="grid grid-flow-col place-items-center">
                {thread.author.plan === UserPlan.PREMIUM && <Crown className="w-5 h-5 text-pink-500 mr-1" />}
                {roleIconMapColored[thread.author.role]}
                <div className="relative w-6 h-6">{rankMap[thread.author.rank]}</div>
              </div>
              <div className="relative w-6 h-6 rounded-[50%] overflow-hidden">
                {thread.author.avatar?.url ? <Image src={thread.author.avatar?.url} alt="author" fill /> : <Image src={defaultUserProfilePicture()} alt="author" fill />}
              </div>
              <p className="items-center">{thread.author.name}</p>
            </div>
          </Link>
          <Dot className="w-4 h-4 text-gray-500" />
          <p className="text-gray-500 text-sm">{formatDate(thread.createdAt.toString())}</p>
        </div>
        <div className="grid grid-cols-[auto_max-content] gap-2 w-max place-items-center ml-auto">
          <div className="ml-auto grid grid-flow-col gap-2">{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
          <ThreadActions canEdit={canEdit} thread={thread} />
        </div>
      </div>
      <Link href={`/forums/threads/${thread.id}`} className="w-max">
        <p className="font-semibold text-lg break-words w-max">{thread.title}</p>
      </Link>
      <Content text={thread?.content} />
      <div className="mt-1">
        <VoteBox thread={thread} signedIn={signedIn} />
      </div>
    </div>
  );
};

export default Thread;
