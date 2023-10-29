import { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Eye, MoreHorizontal } from 'lucide-react';
import Link from '@/components/link';

interface ThreadActionsProps {
  canEdit: boolean;
  thread: any;
}

export const ThreadActions: FC<ThreadActionsProps> = ({ canEdit, thread }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className='w-4 h-4' />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
