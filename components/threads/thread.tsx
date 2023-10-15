import { ThreadWithAuthor } from '@/types';
import { FC } from 'react';

const Thread: FC<{ thread: ThreadWithAuthor }> = ({ thread }) => {
  return (
    <div className='dark:bg-neutral-900 rounded-md p-2'>
      <p>{thread.title}</p>
      <p>{thread.content}</p>
      <p>{thread.author.name}</p>
    </div>
  );
};

export default Thread;
