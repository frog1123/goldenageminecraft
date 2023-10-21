import { ThreadType } from '@/types';
import { FC } from 'react';
import { formatDate } from '@/utils/format-date';
import Link from 'next/link';
import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { Dot, Edit } from 'lucide-react';
import Image from 'next/image';

const Thread: FC<{ thread: ThreadType }> = ({ thread }) => {
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
        <Link href={`/users/${thread.author.id}`}>
          <div className='ml-auto w-max grid grid-flow-col place-items-center bg-neutral-300 dark:bg-neutral-800 p-1 rounded-md'>
            <div className='grid grid-flow-col place-items-center gap-2'>
              <div className='relative w-6 h-6 rounded-[50%] overflow-hidden'>
                <Image src={thread.author.imageUrl} alt='author' fill />
              </div>
              <p>{thread.author.name}</p>
            </div>
            {canEdit && (
              <div className='grid grid-cols-[max-content_max-content] place-items-center'>
                <Dot className='w-4 h-4 text-neutral-400 dark:text-neutral-500' />
                <Link href={`/forums/threads/${thread.id}/edit`}>
                  <Edit className='w-4 h-4 hover:text-blue-500 transition' />
                </Link>
              </div>
            )}
          </div>
        </Link>
      </div>
      <p className='break-words'>{thread?.content}</p>
    </div>
  );
};

export default Thread;
