import { UserThreadType } from '@/types';
import { FC } from 'react';
import { formatDate } from '@/utils/format-date';
import Link from '@/components/link';

import Tag from '@/components/threads/tag';
import { Edit } from 'lucide-react';
import { Content } from '@/components/content';

interface UserThreadProps {
  thread: UserThreadType;
  canEdit: boolean;
}

export const UserThread: FC<UserThreadProps> = ({ thread, canEdit }) => {
  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto'>
      <div className='grid grid-flow-col'>
        <div className='grid grid-flow-col w-max place-items-center gap-2'>
          <p className='text-gray-500 text-sm'>{formatDate(thread.createdAt.toString())}</p>
          {canEdit && (
            <Link href={`/forums/threads/${thread.id}/edit`}>
              <Edit className='w-4 h-4 hover:text-blue-500 transition' />
            </Link>
          )}
        </div>
        <div className='ml-auto grid grid-flow-col gap-2'>{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
      </div>
      <Link href={`/forums/threads/${thread.id}`}>
        <p className='font-semibold text-lg break-words'>{thread.title}</p>
      </Link>
      <Content text={thread?.content} />
    </div>
  );
};
