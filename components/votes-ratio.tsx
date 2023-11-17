import { ThreadVoteStats } from "@/types/threads";
import { HelpCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface VotesRatioProps {
  votesStats: ThreadVoteStats;
  expanded: boolean;
}

export const VotesRatio: FC<VotesRatioProps> = ({ votesStats, expanded }) => {
  const total = votesStats.receivedUpvotes + votesStats.receivedDownvotes;
  const upvoteRatio = (votesStats.receivedUpvotes / total) * 100;
  const downvoteRatio = (votesStats.receivedDownvotes / total) * 100;

  return (
    <div className="grid grid-flow-row gap-1">
      {expanded && (
        <div className="grid grid-cols-[max-content_auto] place-items-center w-full">
          <p className="uppercase text-xs font-bold text-zinc-500">Approval</p>
          <div className="ml-auto grid place-items-center">
            <Popover>
              <PopoverTrigger>
                <HelpCircle className="w-4 h-4 text-zinc-500" />
              </PopoverTrigger>
              <PopoverContent className="p-2 w-max">
                <div>Upvote to downvote ratio</div>
                <div className="grid grid-flow-col place-items-center">
                  <div className="grid grid-flow-col gap-1 place-items-center w-max mr-auto">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{votesStats.receivedUpvotes}</span>
                    <span>({upvoteRatio.toFixed()}%)</span>
                  </div>
                  <div className="grid grid-flow-col gap-1 place-items-center w-max ml-auto">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{votesStats.receivedDownvotes}</span>
                    <span>({downvoteRatio.toFixed()}%)</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
      {Number.isNaN(upvoteRatio) || Number.isNaN(downvoteRatio) ? (
        <div className="flex items-center w-full h-[4px] rounded-md overflow-hidden">
          <div style={{ width: `100%` }} className="h-full bg-gray-500"></div>
        </div>
      ) : (
        <div className="flex items-center w-full h-[4px] rounded-md overflow-hidden">
          <div style={{ width: `${upvoteRatio}%` }} className="h-full bg-green-500"></div>
          <div style={{ width: `${downvoteRatio}%` }} className="h-full bg-red-500"></div>
        </div>
      )}
    </div>
  );
};
