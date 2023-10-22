import { ThreadType } from '@/types';
import { FC } from 'react';
import { formatDate } from '@/utils/format-date';
import Link from '@/components/link';
import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { Crown, Dot, Edit, Gavel, Sailboat, Shield } from 'lucide-react';
import Image from 'next/image';
import { UserRank, UserRole, UserPlan } from '@prisma/client';

import coal from '@/public/assets/ranks/coal.png';
import iron from '@/public/assets/ranks/iron.png';
import gold from '@/public/assets/ranks/gold.png';
import redstone from '@/public/assets/ranks/redstone.png';
import lapis from '@/public/assets/ranks/lapis.png';
import diamond from '@/public/assets/ranks/diamond.png';
import Tag from '@/components/threads/tag';

const Thread: FC<{ thread: ThreadType }> = ({ thread }) => {
  const { userId } = useClerkAuth();

  const canEdit = userId === thread.author.userId;

  const rankMap = {
    [UserRank.COAL]: <Image src={coal} alt='rank' fill />,
    [UserRank.IRON]: <Image src={iron} alt='rank' fill />,
    [UserRank.GOLD]: <Image src={gold} alt='rank' fill />,
    [UserRank.REDSTONE]: <Image src={redstone} alt='rank' fill />,
    [UserRank.LAPIS]: <Image src={lapis} alt='rank' fill />,
    [UserRank.DIAMOND]: <Image src={diamond} alt='rank' fill />
  };

  const roleMap = {
    [UserRole.USER]: null,
    [UserRole.MODERATOR]: <Shield className='w-5 h-5 text-blue-500' />,
    [UserRole.ADMIN]: <Gavel className='w-5 h-5 text-rose-500' />,
    [UserRole.OWNER]: <Sailboat className='w-5 h-5 text-indigo-700' />
  };

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto'>
      <div className='grid grid-flow-col'>
        <div className='grid grid-flow-col w-max place-items-center'>
          <Link href={`/users/${thread.author.id}`}>
            <div className='w-max grid grid-flow-col place-items-center bg-neutral-300 dark:bg-neutral-800 p-1 rounded-md'>
              <div className='grid grid-flow-col place-items-center gap-1'>
                <div className='grid grid-flow-col place-items-center'>
                  {thread.author.plan === UserPlan.PREMIUM && <Crown className='w-5 h-5 text-pink-500 mr-1' />}
                  {roleMap[thread.author.role]}
                  <div className='relative w-6 h-6'>{rankMap[thread.author.rank]}</div>
                </div>
                <div className='relative w-6 h-6 rounded-[50%] overflow-hidden'>
                  <Image src={thread.author.imageUrl} alt='author' fill />
                </div>
                <p className='items-center'>{thread.author.name}</p>
              </div>
              {canEdit && (
                <div className='grid grid-cols-[max-content_max-content] place-items-center'>
                  <Dot className='w-4 h-4 text-gray-500' />
                  <Link href={`/forums/threads/${thread.id}/edit`}>
                    <Edit className='w-4 h-4 hover:text-blue-500 transition' />
                  </Link>
                </div>
              )}
            </div>
          </Link>
          <Dot className='w-4 h-4 text-gray-500' />
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

export default Thread;
