import PageNotFound from '@/components/page-not-found';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { formatDateLong } from '@/utils/format-date-long';
import { NextPage } from 'next';
import Image from 'next/image';

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
          name: true,
          imageUrl: true,
          createdAt: true,
          _count: true
        }
      }
    }
  });

  if (!thread) return <PageNotFound message='Thread not found :/' />;

  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2'>
        <div className='grid grid-cols-[max-content_max-content_auto] gap-2'>
          <div className='grid grid-flow-row gap-2 place-items-center'>
            <div className='w-28 h-28 rounded-md overflow-hidden'>
              <img src={thread.author.imageUrl} alt='author' />
            </div>
            <p>{thread.author.name}</p>
            <p>Joined {formatDateLong(thread.author.createdAt.toString())}</p>
            <p>{thread.author._count.threads} Threads</p>
          </div>
          <Separator orientation='vertical' />
          <div className=''>
            <p className='font-semibold text-lg'>{thread?.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadIdPage;
