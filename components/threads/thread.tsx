import { ThreadWithAuthor } from '@/types';
import { FC } from 'react';
import { formatDate } from '@/utils/format-date';

const Thread: FC<{ thread: ThreadWithAuthor }> = ({ thread }) => {
  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 rounded-md p-2'>
      <p>{thread.title}</p>
      <p>{thread.content}</p>
      <p>{thread.author.name}</p>
      <p>{formatDate(thread.createdAt)}</p>
    </div>
  );
};

export default Thread;
