import { UserThreadType } from '@/types';
import { FC, useState } from 'react';
import { formatDate } from '@/utils/format-date';
import Link from '@/components/link';

import Tag from '@/components/threads/tag';
import { Content } from '@/components/content';
import { ThreadActions } from '@/components/threads/thread-actions';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface UserThreadProps {
  thread: UserThreadType;
  canEdit: boolean;
  signedIn: boolean;
}

export const UserThread: FC<UserThreadProps> = ({ thread, canEdit, signedIn }) => {
  const [upvoteCount, setUpvoteCount] = useState(thread._count.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(thread._count.downvotes);

  const [hasUpvoted, setHasUpvoted] = useState(signedIn ? thread.upvotes.length > 0 : false);
  const [hasDownvoted, setHasDownvoted] = useState(signedIn ? thread.downvotes.length > 0 : false);

  const handleLikePost = async () => {
    await axios.post('/api/threads/votes', { threadId: thread.id, type: 'u' });

    if (!hasUpvoted) {
      if (hasDownvoted) setDownvoteCount(downvoteCount - 1);

      setHasUpvoted(true);
      setHasDownvoted(false);
      setUpvoteCount(upvoteCount + 1);
    }
  };

  const handleDislikePost = async () => {
    await axios.post('/api/threads/votes', { threadId: thread.id, type: 'd' });

    if (!hasDownvoted) {
      if (hasUpvoted) setUpvoteCount(upvoteCount - 1);

      setHasUpvoted(false);
      setHasDownvoted(true);
      setDownvoteCount(downvoteCount + 1);
    }
  };

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto'>
      <div className='grid grid-flow-col'>
        <div className='grid grid-flow-col w-max place-items-center gap-2'>
          <p className='text-gray-500 text-sm'>{formatDate(thread.createdAt.toString())}</p>
        </div>
        <div className='grid grid-cols-[auto_max-content] gap-2 w-max place-items-center ml-auto'>
          <div className='ml-auto grid grid-flow-col gap-2'>{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
          <ThreadActions canEdit={canEdit} thread={thread} />
        </div>
      </div>
      <Link href={`/forums/threads/${thread.id}`}>
        <p className='font-semibold text-lg break-words'>{thread.title}</p>
      </Link>
      <Content text={thread?.content} />
      <div className='grid grid-flow-col gap-1 w-max place-items-center'>
        <button
          onClick={handleLikePost}
          className={cn('w-max border-[1px] rounded-md px-1 font-semibold', hasUpvoted ? 'bg-blue-500/30 border-blue-500/60' : 'bg-white-500/40 border-neutral-800')}
        >
          <span>{upvoteCount}</span>👍
        </button>
        <button
          onClick={handleDislikePost}
          className={cn('w-max border-[1px] rounded-md px-1 font-semibold', hasDownvoted ? 'bg-blue-500/30 border-blue-500/60' : 'bg-white-500/40 border-neutral-800')}
        >
          <span>{downvoteCount}</span>👎
        </button>
      </div>
    </div>
  );
};
