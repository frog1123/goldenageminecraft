import { VoteStats } from '@/types';
import { FC } from 'react';

interface VotesRatioProps {
  votesStats: VoteStats;
}

export const VotesRatio: FC<VotesRatioProps> = ({ votesStats }) => {
  const total = votesStats.receivedUpvotes + votesStats.receivedDownvotes;
  const upvoteRatio = (votesStats.receivedUpvotes / total) * 100;
  const downvoteRatio = (votesStats.receivedDownvotes / total) * 100;

  return (
    <div className='flex items-center w-full h-[4px]'>
      <div style={{ width: `${upvoteRatio}%` }} className='h-full bg-green-500'></div>
      <div style={{ width: `${downvoteRatio}%` }} className='h-full bg-red-500'></div>
    </div>
  );
};
