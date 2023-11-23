"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/utils/cn";
import { ThreadReplySignedType, ThreadReplyUnsignedType } from "@/types/threads";
import { VoteType } from "@prisma/client";
import axios from "axios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FC, useState } from "react";

interface ReplyVoteBoxProps {
  reply: ThreadReplySignedType | ThreadReplyUnsignedType;
  signedIn: boolean;
}

export const ReplyVoteBox: FC<ReplyVoteBoxProps> = ({ reply, signedIn }) => {
  const [upvoteCount, setUpvoteCount] = useState(reply.count.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(reply.count.downvotes);

  // TODO add

  console.log("votebox", reply);

  const [hasUpvoted, setHasUpvoted] = useState<boolean>(signedIn ? (reply as ThreadReplySignedType).signedInVote?.type === VoteType.UPVOTE : false);
  const [hasDownvoted, setHasDownvoted] = useState<boolean>(signedIn ? (reply as ThreadReplySignedType).signedInVote?.type === VoteType.DOWNVOTE : false);
  const modal = useModal();

  const handleLikePost = async () => {
    if (!signedIn) {
      modal.onOpen("sign-in-req");
      return;
    }
    if (hasDownvoted) {
      // vote modify u -> d
      await axios.patch(`/api/threads/replies/votes?v=${(reply as ThreadReplySignedType).signedInVote?.id}&ty=${"u"}`);
      setHasUpvoted(true);
      setHasDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
      setUpvoteCount(upvoteCount + 1);
      return;
    }
    if (hasUpvoted) {
      // vote delete
      await axios.delete(`/api/threads/replies/votes?v=${(reply as ThreadReplySignedType).signedInVote?.id}`);
      setHasUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
      return;
    }
    // vote create
    await axios.post(`/api/threads/replies/votes?r=${reply.id}&ty=${"u"}`);
    if (hasDownvoted) setDownvoteCount(downvoteCount - 1);
    setHasUpvoted(true);
    setHasDownvoted(false);
    setUpvoteCount(upvoteCount + 1);
  };

  const handleDislikePost = async () => {
    if (!signedIn) {
      modal.onOpen("sign-in-req");
      return;
    }
    if (hasUpvoted) {
      // vote modify d -> u
      await axios.patch(`/api/threads/replies/votes?v=${(reply as ThreadReplySignedType).signedInVote?.id}&ty=${"d"}`);
      setHasUpvoted(false);
      setHasDownvoted(true);
      setDownvoteCount(downvoteCount + 1);
      setUpvoteCount(upvoteCount - 1);
      return;
    }
    if (hasDownvoted) {
      // vote delete
      await axios.delete(`/api/threads/replies/votes?v=${(reply as ThreadReplySignedType).signedInVote?.id}`);
      setHasDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
      return;
    }
    // vote modify
    await axios.post(`/api/threads/replies/votes?r=${reply.id}&ty=${"d"}`);
    if (hasUpvoted) setUpvoteCount(upvoteCount - 1);
    setHasUpvoted(false);
    setHasDownvoted(true);
    setDownvoteCount(downvoteCount + 1);
  };

  return (
    <div className="grid grid-flow-col gap-1 w-max place-items-center">
      <button
        onClick={handleLikePost}
        className={cn(
          "w-max border-[1px] rounded-md px-1 font-semibold grid grid-flow-col gap-1 place-items-center",
          hasUpvoted ? "bg-blue-500/30 border-blue-500/60" : "bg-white-500/40 border-zinc-400 dark:border-border"
        )}
      >
        <span>{upvoteCount}</span>
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        onClick={handleDislikePost}
        className={cn(
          "w-max border-[1px] rounded-md px-1 font-semibold grid grid-flow-col gap-1 place-items-center",
          hasDownvoted ? "bg-blue-500/30 border-blue-500/60" : "bg-white-500/40 border-zinc-400 dark:border-border"
        )}
      >
        <span>{downvoteCount}</span>
        <ThumbsDown className="w-4 h-4" />
      </button>
    </div>
  );
};
