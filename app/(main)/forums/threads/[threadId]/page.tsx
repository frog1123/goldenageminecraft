import PageNotFound from '@/components/page-not-found';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { formatDateLong } from '@/utils/format-date-long';
import { NextPage } from 'next';
import Image from 'next/image';
import { UserRank, UserRole, UserPlan } from '@prisma/client';

import coal from '@/public/assets/ranks/coal.png';
import iron from '@/public/assets/ranks/iron.png';
import gold from '@/public/assets/ranks/gold.png';
import redstone from '@/public/assets/ranks/redstone.png';
import lapis from '@/public/assets/ranks/lapis.png';
import diamond from '@/public/assets/ranks/diamond.png';
import { Crown, Gavel, Sailboat, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Content } from '@/components/content';
import Link from '@/components/link';
import { Subnav } from '@/components/navbar/subnav';

interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage: NextPage<ThreadIdPageProps> = async ({ params }) => {
  const thread = await db.thread.findUnique({
    where: {
      id: params.threadId
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          createdAt: true,
          rank: true,
          role: true,
          plan: true,
          _count: true
        }
      }
    }
  });

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

  if (!thread) return <PageNotFound message='Thread not found :/' />;

  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Subnav />
      <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2'>
        <div className='grid grid-cols-[max-content_max-content_auto] gap-2'>
          <div className='grid grid-flow-row gap-2 place-items-center'>
            <div className='w-28 h-28 rounded-md overflow-hidden relative'>
              <Image src={thread.author.imageUrl} fill alt='author' />
            </div>
            <Link href={`/users/${thread.author.id}`} className='hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md'>
              {thread.author.name}
            </Link>
            <p className='uppercase text-xs font-bold text-zinc-500'>Joined {formatDateLong(thread.author.createdAt.toString())}</p>
            <p className='uppercase text-xs font-bold text-zinc-500'>{thread.author._count.threads} Threads</p>
            <div className='w-full rounded-md overflow-hidden'>
              <div className={cn('grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1', rankColorMap[thread.author.rank])}>
                <div className='w-6 h-6 overflow-hidden relative'>{rankMap[thread.author.rank]}</div>
                <span className='mr-auto font-semibold text-white'>{thread.author.rank}</span>
              </div>
              {thread.author.role !== 'USER' && (
                <div className={cn('grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center p-1', roleColorMap[thread.author.role])}>
                  <div className='w-6 h-6 overflow-hidden relative'>{roleIconMap[thread.author.role]}</div>
                  <span className='mr-auto font-semibold text-white'>{thread.author.role}</span>
                </div>
              )}
              {thread.author.plan === 'PREMIUM' && (
                <div className='grid grid-flow-col grid-cols-[max-content_auto] gap-1 w-full place-items-center bg-pink-500 p-1'>
                  <div className='w-6 h-6 overflow-hidden relative'>
                    <Crown className='text-white' />
                  </div>
                  <span className='mr-auto font-semibold text-white'>{thread.author.plan}</span>
                </div>
              )}
            </div>
          </div>
          <Separator orientation='vertical' />
          <div className='overflow-hidden'>
            <p className='font-semibold text-lg'>{thread.title}</p>
            <Content text={thread?.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadIdPage;
