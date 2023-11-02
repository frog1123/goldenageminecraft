'use client';

import { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Eye, MoreHorizontal, Share } from 'lucide-react';
import Link from '@/components/link';
import { useModal } from '@/hooks/use-modal-store';

interface ThreadActionsProps {
  canEdit: boolean;
  thread: any;
}

export const ThreadActions: FC<ThreadActionsProps> = ({ canEdit, thread }) => {
  const modal = useModal();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className='w-4 h-4 cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {canEdit && (
          <DropdownMenuItem>
            <Link href={`/forums/threads/${thread.id}/edit`} className='w-full'>
              <div className='flex place-items-center w-full gap-2'>
                <span>Edit thread</span>
                <Edit className='w-4 h-4 ml-auto' />
              </div>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link href={`/forums/threads/${thread.id}`} className='w-full'>
            <div className='flex place-items-center w-full gap-2'>
              <span>View thread</span>
              <Eye className='w-4 h-4 ml-auto' />
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => modal.onOpen('share-thread', { shareThread: { threadId: thread.id } })}>
          <div className='flex place-items-center w-full gap-2'>
            <span>Share thread</span>
            <Share className='w-4 h-4 ml-auto' />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
