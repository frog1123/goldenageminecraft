import { ThreadWithAuthor } from '@/types';
import { FC } from 'react';
import { formatDate } from '@/utils/format-date';
import Link from 'next/link';
import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { Edit } from 'lucide-react';

const Thread: FC<{ thread: ThreadWithAuthor }> = ({ thread }) => {
  const { userId } = useClerkAuth();

  const canEdit = userId === thread.author.userId;

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 rounded-md p-2 overflow-auto'>
      <div className='grid grid-flow-col'>
        <div className='grid grid-cols-[max-content_max-content] gap-2 place-items-center'>
          <Link href={`/forums/threads/${thread.id}`}>
            <p className='font-semibold text-lg'>{thread.title}</p>
          </Link>
          <p className='text-gray-500 text-sm'>{formatDate(thread.createdAt.toString())}</p>
        </div>
        <div className='ml-auto grid grid-cols-[max-content_max-content] gap-2 place-items-center'>
          <Link href={`/users/${thread.author.id}`}>
            <p>{thread.author.name}</p>
          </Link>
          {canEdit && (
            <Link href={`/forums/threads/${thread.id}/edit`}>
              <Edit className='w-4 h-4' />
            </Link>
          )}
        </div>
      </div>
      <p className='break-words'>{thread?.content}</p>
    </div>
  );
};

export default Thread;
