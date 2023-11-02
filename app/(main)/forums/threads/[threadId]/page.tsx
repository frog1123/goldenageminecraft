import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { formatDateLong } from '@/utils/format-date-long';
import { NextPage } from 'next';
import Image from 'next/image';
import { UserRank, UserRole } from '@prisma/client';

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
import { VoteBox } from '@/components/threads/vote-box';
import { getCurrentUser } from '@/lib/current-user';
import Tag from '@/components/threads/tag';
import { ThreadActions } from '@/components/threads/thread-actions';
interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage: NextPage<ThreadIdPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser();
  const signedIn = !!currentUser;

  let thread;

  if (signedIn) {
    thread = await db.thread.findUnique({
      where: {
        id: params.threadId
      },
      include: {
        author: {
          select: {
            id: true,
            userId: true,
            name: true,
            imageUrl: true,
            createdAt: true,
            rank: true,
            role: true,
            plan: true,
            _count: {
              select: {
                threads: true
              }
            }
          }
        },
        tags: {
          select: {
            id: true,
            name: true
          }
        },
        upvotes: {
          where: {
            authorId: currentUser.id
          }
        },
        downvotes: {
          where: {
            authorId: currentUser.id
          }
        },
        _count: {
          select: {
            upvotes: true,
            downvotes: true
          }
        }
      }
    });
  } else {
    thread = await db.thread.findUnique({
      where: {
        id: params.threadId
      },
      include: {
        author: {
          select: {
            id: true,
            userId: true,
            name: true,
            imageUrl: true,
            createdAt: true,
            rank: true,
            role: true,
            plan: true,
            _count: {
              select: {
                threads: true
              }
            }
          }
        },
        tags: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: {
            upvotes: true,
            downvotes: true
          }
        }
      }
    });
  }

  const canEdit = thread?.author?.userId === currentUser?.id;

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

  if (!thread)
    return (
      <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2'>
        <p className='text-center'>:( Thread does not exist or cannot be found</p>
      </div>
    );

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-flow-row gap-2'>
      <div className='grid grid-cols-[auto_max-content] gap-2'>
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
          <div className='overflow-hidden grid grid-rows-[max-content_max-content_auto]'>
            <div className='grid grid-flow-col place-items-center'>
              <div className='mr-auto'>
                <p className='uppercase text-xs font-bold text-zinc-500'>POSTED {formatDateLong(thread.createdAt.toString())}</p>
              </div>
              <div className='ml-auto'>
                <ThreadActions thread={thread} canEdit={canEdit} />
              </div>
            </div>
            <p className='font-semibold text-lg'>{thread.title}</p>
            <Content text={thread?.content} />
          </div>
        </div>
      </div>
      <Separator />
      <div className='grid grid-flow-col'>
        <VoteBox thread={thread} signedIn={signedIn} />
        <div className='ml-auto grid grid-flow-col gap-2'>{thread.tags && thread.tags.map(tag => <Tag id={tag.id} name={tag.name} key={tag.id} />)}</div>
      </div>
    </div>
  );
};

export default ThreadIdPage;
