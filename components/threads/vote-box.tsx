import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { ThreadType, UserThreadType } from '@/types';
import axios from 'axios';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC, useState } from 'react';

interface VoteBoxProps {
  thread: ThreadType | UserThreadType;
  signedIn: boolean;
}

export const VoteBox: FC<VoteBoxProps> = ({ thread, signedIn }) => {
  const [upvoteCount, setUpvoteCount] = useState(thread._count.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(thread._count.downvotes);

  const [hasUpvoted, setHasUpvoted] = useState(signedIn ? thread.upvotes.length > 0 : false);
  const [hasDownvoted, setHasDownvoted] = useState(signedIn ? thread.downvotes.length > 0 : false);
  const modal = useModal();

  const handleLikePost = async () => {
    if (!signedIn) {
      modal.onOpen('sign-in-req');
      return;
    }

    if (hasUpvoted) {
      await axios.delete(`/api/threads/votes?t=${thread.id}&ty=${'u'}`);
      setHasUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
      return;
    }

    await axios.post('/api/threads/votes', { threadId: thread.id, type: 'u' });

    if (hasDownvoted) setDownvoteCount(downvoteCount - 1);

    setHasUpvoted(true);
    setHasDownvoted(false);
    setUpvoteCount(upvoteCount + 1);
  };

  const handleDislikePost = async () => {
    if (!signedIn) {
      modal.onOpen('sign-in-req');
      return;
    }

    if (hasDownvoted) {
      await axios.delete(`/api/threads/votes?t=${thread.id}&ty=${'d'}`);
      setHasDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
      return;
    }

    await axios.post('/api/threads/votes', { threadId: thread.id, type: 'd' });

    if (hasUpvoted) setUpvoteCount(upvoteCount - 1);

    setHasUpvoted(false);
    setHasDownvoted(true);
    setDownvoteCount(downvoteCount + 1);
  };

  return (
    <div className='grid grid-flow-col gap-1 w-max place-items-center'>
      <button
        onClick={handleLikePost}
        className={cn(
          'w-max border-[1px] rounded-md px-1 font-semibold grid grid-flow-col gap-1 place-items-center',
          hasUpvoted ? 'bg-blue-500/30 border-blue-500/60' : 'bg-white-500/40 border-neutral-800'
        )}
      >
        <span>{upvoteCount}</span>
        <ThumbsUp className='w-4 h-4' />
      </button>
      <button
        onClick={handleDislikePost}
        className={cn(
          'w-max border-[1px] rounded-md px-1 font-semibold grid grid-flow-col gap-1 place-items-center',
          hasDownvoted ? 'bg-blue-500/30 border-blue-500/60' : 'bg-white-500/40 border-neutral-800'
        )}
      >
        <span>{downvoteCount}</span>
        <ThumbsDown className='w-4 h-4' />
      </button>
    </div>
  );
};
