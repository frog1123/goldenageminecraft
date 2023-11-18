import { ThreadReplySignedType, ThreadReplyUnsignedType, ThreadVoteStats } from "@/types/threads";
import { FC } from "react";
import Image from "next/image";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { Link } from "@/components/link";
import { formatDateLong } from "@/utils/format-date-long";
import { cn } from "@/lib/utils";
import { rankColorMap, rankMap, roleColorMap, roleIconMap } from "@/components/users/styles";
import { Crown } from "lucide-react";
import { Separator } from "@/components/separator";
import { Content } from "@/components/content";
import { VotesRatio } from "@/components/votes-ratio";

interface ThreadReplyProps {
  reply: ThreadReplySignedType | ThreadReplyUnsignedType;
}

export const ThreadReply: FC<ThreadReplyProps> = ({ reply }) => {
  let voteStats: ThreadVoteStats = {
    receivedUpvotes: 0,
    receivedDownvotes: 0
  };

  reply?.author?.threads.forEach(thread => {
    voteStats.receivedUpvotes += thread._count.upvotes;
    voteStats.receivedDownvotes += thread._count.downvotes;
  });

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-flow-row gap-2">
      <div className="grid grid-cols-[max-content_max-content_auto] gap-2">
        <div className="grid grid-flow-row gap-2 place-items-center">
          <div className="w-28 h-28 rounded-md overflow-hidden relative">
            {reply.author.imageUrl ? <Image src={reply.author.imageUrl} fill alt="author" /> : <Image src={defaultUserProfilePicture()} fill alt="author" />}
          </div>
          <div className="grid grid-flow-row gap-0 place-items-center">
            <Link href={`/users/${reply.author.id}`} className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md">
              <p className="font-semibold">{reply.author.name}</p>
            </Link>
            {(reply.author.firstName || reply.author.lastName) && (
              <p className="font-semibold">
                {reply.author.firstName && <span>{reply.author.firstName}</span>} {reply.author.lastName && <span>{reply.author.lastName}</span>}
              </p>
            )}
          </div>
          <p className="uppercase text-xs font-bold text-zinc-500">Joined {formatDateLong(reply.author.createdAt.toString())}</p>
          <div className="w-full my-1">
            <VotesRatio votesStats={voteStats} expanded />
          </div>
          <p className="uppercase text-xs font-bold text-zinc-500">{reply.author._count.threads} Threads</p>
          <div className="w-full rounded-md overflow-hidden">
            <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", rankColorMap[reply.author.rank])}>
              <div className="w-6 h-6 overflow-hidden relative">{rankMap[reply.author.rank]}</div>
              <span className="mr-auto font-semibold text-white">{reply.author.rank}</span>
            </div>
            {reply.author.role !== "USER" && (
              <div className={cn("grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1", roleColorMap[reply.author.role])}>
                <div className="w-6 h-6 overflow-hidden relative">{roleIconMap[reply.author.role]}</div>
                <span className="mr-auto font-semibold text-white">{reply.author.role}</span>
              </div>
            )}
            {reply.author.plan === "PREMIUM" && (
              <div className="grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center bg-pink-500 p-1">
                <div className="w-6 h-6 overflow-hidden relative">
                  <Crown className="text-white" />
                </div>
                <span className="mr-auto font-semibold text-white">{reply.author.plan}</span>
              </div>
            )}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="overflow-hidden grid grid-rows-[max-content_max-content_auto]">
          <div className="grid grid-flow-col place-items-center">
            <div className="mr-auto grid grid-flow-col place-items-center gap-2">
              <p className="uppercase text-xs font-bold text-zinc-500">Replied {formatDateLong(reply.createdAt.toString())}</p>
              {/* {thread.editedAt && <p className="uppercase text-xs font-bold text-zinc-500">Edited {formatDateLong(reply.editedAt.toString())}</p>} */}
            </div>
            <div className="ml-auto">{/* <ThreadActions thread={thread} canEdit={canEdit} /> */}</div>
          </div>
          <Content text={reply.content} />
        </div>
      </div>
      <Separator orientation="horizontal" />
      {/* <div className="grid grid-flow-col">
        <VoteBox thread={thread} signedIn={signedIn} />
        <div className="ml-auto grid grid-flow-col gap-2">{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
      </div> */}
    </div>
  );
};
