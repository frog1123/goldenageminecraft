import { FC } from "react";
import { Link } from "@/components/link";
import { VotesRatio } from "@/components/votes-ratio";
import { ThreadExpandedSignedType, ThreadExpandedUnsignedType, ThreadVoteStats } from "@/types/threads";
import Image from "next/image";
import { formatDateLong } from "@/utils/format-date-long";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { rankColorMap, rankMap, roleColorMap, roleIconMap } from "@/components/users/styles";
import { cn } from "@/utils/cn";
import { Component, Crown } from "lucide-react";
import { Separator } from "@/components/separator";
import { ThreadActions } from "@/components/threads/thread-actions";
import { Content } from "@/components/content";
import { ThreadVoteBox } from "@/components/threads/vote-box";
import { Tag } from "@/components/threads/tag";

interface ThreadExpandedProps {
  thread: ThreadExpandedSignedType | ThreadExpandedUnsignedType;
  authorVoteStats: ThreadVoteStats;
  canEdit: boolean;
  signedIn: boolean;
}

export const ThreadExpanded: FC<ThreadExpandedProps> = ({ thread, authorVoteStats, canEdit, signedIn }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-flow-row gap-2">
      <div className="grid grid-cols-[max-content_max-content_auto] gap-2">
        <div className="grid grid-flow-row gap-2 place-items-center">
          <div className="w-28 h-28 rounded-md overflow-hidden relative">
            {thread.author.imageUrl ? <Image src={thread.author.imageUrl} fill alt="author" /> : <Image src={defaultUserProfilePicture()} fill alt="author" />}
          </div>
          <div className="grid grid-flow-row gap-0 place-items-center">
            <Link href={`/users/${thread.author.id}`} className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md">
              <p className="font-semibold">{thread.author.name}</p>
            </Link>
            {(thread.author.firstName || thread.author.lastName) && (
              <p className="font-semibold">
                {thread.author.firstName && <span>{thread.author.firstName}</span>} {thread.author.lastName && <span>{thread.author.lastName}</span>}
              </p>
            )}
          </div>
          <p className="uppercase text-xs font-bold text-zinc-500">Joined {formatDateLong(thread.author.createdAt.toString())}</p>
          <div className="w-full my-1">
            <VotesRatio votesStats={authorVoteStats} expanded />
          </div>
          <p className="uppercase text-xs font-bold text-zinc-500">{thread.author._count.threads} Threads</p>
          <div className="w-full rounded-md overflow-hidden">
            <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", rankColorMap[thread.author.rank])}>
              <div className="w-6 h-6 overflow-hidden relative">{rankMap[thread.author.rank]}</div>
              <span className="mr-auto font-semibold text-white">{thread.author.rank}</span>
            </div>
            {thread.author.role !== "USER" && (
              <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", roleColorMap[thread.author.role])}>
                <div className="w-6 h-6 overflow-hidden relative">{roleIconMap[thread.author.role]}</div>
                <span className="mr-auto font-semibold text-white">{thread.author.role}</span>
              </div>
            )}
            {thread.author.plan === "PREMIUM" && (
              <div className="grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center bg-pink-500 p-1">
                <div className="w-6 h-6 overflow-hidden relative">
                  <Crown className="text-white" />
                </div>
                <span className="mr-auto font-semibold text-white">{thread.author.plan}</span>
              </div>
            )}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="overflow-hidden grid grid-rows-[max-content_max-content_auto]">
          <div className="grid grid-flow-col place-items-center">
            <div className="hidden sm:grid mr-auto grid-flow-col place-items-center gap-2">
              <p className="uppercase text-xs font-bold text-zinc-500">Posted {formatDateLong(thread.createdAt.toString())}</p>
              {thread.editedAt && <p className="uppercase text-xs font-bold text-zinc-500">Edited {formatDateLong(thread.editedAt.toString())}</p>}
            </div>
            <div className="flex sm:hidden mr-auto">
              <p className="uppercase text-xs font-bold text-zinc-500">{formatDateLong(thread.createdAt.toString())}</p>
            </div>
            <div className="ml-auto grid grid-flow-col gap-1 place-items-center">
              <div className="bg-yellow-500/20 transition p-1 rounded-md grid grid-cols-[max-content_max-content] place-items-center gap-[2px]">
                <Component className="w-4 h-4" />
                <span className="text-xs font-bold">OP</span>
              </div>
              <ThreadActions thread={thread} canEdit={canEdit} noView redirectToHomeOnDelete />
            </div>
          </div>
          <p className="font-semibold text-lg">{thread.title}</p>
          <Content text={thread?.content} />
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="grid grid-flow-col">
        <ThreadVoteBox thread={thread} signedIn={signedIn} />
        <div className="ml-auto grid grid-flow-col gap-2">{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
      </div>
    </div>
  );
};
