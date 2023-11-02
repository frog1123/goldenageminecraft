import { FC } from 'react';
import Image from 'next/image';
import { UserWithoutEmail } from '@/types';
import { formatDateLong } from '@/utils/format-date-long';
import { UserRank, UserRole } from '@prisma/client';

import coal from '@/public/assets/ranks/coal.png';
import iron from '@/public/assets/ranks/iron.png';
import gold from '@/public/assets/ranks/gold.png';
import redstone from '@/public/assets/ranks/redstone.png';
import lapis from '@/public/assets/ranks/lapis.png';
import diamond from '@/public/assets/ranks/diamond.png';
import { Crown, Edit, Gavel, LeafyGreen, Sailboat, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { VotesRatio } from '../votes-ratio';
import Link from '@/components/link';
import { Content } from '@/components/content';

interface UserInfoProps {
  user: UserWithoutEmail;
  voteStats: {
    receivedUpvotes: number;
    receivedDownvotes: number;
  };
  canEdit: boolean;
}

export const UserInfo: FC<UserInfoProps> = ({ user, voteStats, canEdit }) => {
  const rankMap = {
    [UserRank.COAL]: <Image src={coal} alt='rank' fill />,
    [UserRank.IRON]: <Image src={iron} alt='rank' fill />,
    [UserRank.GOLD]: <Image src={gold} alt='rank' fill />,
    [UserRank.REDSTONE]: <Image src={redstone} alt='rank' fill />,
    [UserRank.LAPIS]: <Image src={lapis} alt='rank' fill />,
    [UserRank.DIAMOND]: <Image src={diamond} alt='rank' fill />
  };

  const rankColorMap = {
    [UserRank.COAL]: 'bg-neutral-950',
    [UserRank.IRON]: 'bg-neutral-400',
    [UserRank.GOLD]: 'bg-yellow-500',
    [UserRank.REDSTONE]: 'bg-red-800',
    [UserRank.LAPIS]: 'bg-blue-600',
    [UserRank.DIAMOND]: 'bg-cyan-500'
  };

  const roleIconMap = {
    [UserRole.USER]: null,
    [UserRole.MODERATOR]: <Shield className='w-5 h-5 text-white' />,
    [UserRole.ADMIN]: <Gavel className='w-5 h-5 text-white' />,
    [UserRole.OWNER]: <Sailboat className='w-5 h-5 text-white' />
  };

  const roleColorMap = {
    [UserRole.USER]: null,
    [UserRole.MODERATOR]: 'bg-blue-500',
    [UserRole.ADMIN]: 'bg-rose-500',
    [UserRole.OWNER]: 'bg-indigo-700'
  };

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2'>
      <div className='grid grid-cols-[max-content_max-content_auto] gap-2'>
        <div className='grid grid-flow-row place-items-center gap-2'>
          <div className='w-28 h-28 rounded-md overflow-hidden relative'>
            <Image src={user.imageUrl} fill alt='author' />
          </div>
          <div className='grid grid-flow-row gap-0 place-items-center'>
            <p className='font-semibold p-1'>{user.name}</p>
            {(user.firstName || user.lastName) && (
              <p className='font-semibold'>
                {user.firstName && <span>{user.firstName}</span>} {user.lastName && <span>{user.lastName}</span>}
              </p>
            )}
          </div>
          <p className='uppercase text-xs font-bold text-zinc-500'>Joined {formatDateLong(user.createdAt.toString())}</p>
          <div className='w-full my-1'>
            <VotesRatio votesStats={voteStats} expanded />
          </div>
          <div className='w-full rounded-md overflow-hidden'>
            <div className={cn('grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1', rankColorMap[user.rank])}>
              <div className='w-6 h-6 overflow-hidden relative'>{rankMap[user.rank]}</div>
              <span className='mr-auto font-semibold text-white'>{user.rank}</span>
            </div>
            {user.role !== 'USER' && (
              <div className={cn('grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1', roleColorMap[user.role])}>
                <div className='w-6 h-6 overflow-hidden relative'>{roleIconMap[user.role]}</div>
                <span className='mr-auto font-semibold text-white'>{user.role}</span>
              </div>
            )}
            {user.plan === 'PREMIUM' && (
              <div className='grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center bg-pink-500 p-1'>
                <div className='w-6 h-6 overflow-hidden relative'>
                  <Crown className='text-white' />
                </div>
                <span className='mr-auto font-semibold text-white'>{user.plan}</span>
              </div>
            )}
          </div>
        </div>
        <Separator orientation='vertical' />
        <div>
          {canEdit ? (
            <Link href={`/users/${user.id}/edit`}>
              <div className='grid grid-flow-col place-items-center w-max gap-1 mr-auto hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md'>
                <div>
                  <Edit className='w-[0.8rem] h-[0.8rem] text-zinc-500' />
                </div>
                <p className='uppercase text-xs font-bold text-zinc-500 mt-[2px]'>Bio</p>
              </div>
            </Link>
          ) : (
            <div className='grid grid-flow-col place-items-center w-max gap-1 mr-auto p-1 rounded-md'>
              <div>
                <LeafyGreen className='w-[0.8rem] h-[0.8rem] text-zinc-500' />
              </div>
              <p className='uppercase text-xs font-bold text-zinc-500 mt-[2px]'>Bio</p>
            </div>
          )}
          {user.bio && <Content text={user.bio} />}
        </div>
      </div>
    </div>
  );
};
