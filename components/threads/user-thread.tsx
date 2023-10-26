import { UserThreadType } from '@/types';
import { FC } from 'react';
import { formatDate } from '@/utils/format-date';
import Link from '@/components/link';
import { useAuth as useClerkAuth } from '@clerk/nextjs';

import Tag from '@/components/threads/tag';

export const UserThread: FC<{ thread: UserThreadType }> = ({ thread }) => {
  const { userId } = useClerkAuth();

  // const canEdit = userId === thread.author.userId;
  const canEdit = true;

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto'>
      <div className='grid grid-flow-col'>
        <div className='grid grid-flow-col w-max place-items-center'>
          <p className='text-gray-500 text-sm'>{formatDate(thread.createdAt.toString())}</p>
        </div>
        <div className='ml-auto grid grid-flow-col gap-2'>{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
      </div>
      <Link href={`/forums/threads/${thread.id}`}>
        <p className='font-semibold text-lg break-words'>{thread.title}</p>
      </Link>
      <p className='break-words'>{thread?.content}</p>
    </div>
  );
};
