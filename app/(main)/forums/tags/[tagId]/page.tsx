import TagThreads from '@/components/threads/tag-threads';
import { db } from '@/lib/db';
import { formatDateLong } from '@/utils/format-date-long';
import { Hash } from 'lucide-react';
import { NextPage } from 'next';

interface TagIdPageProps {
  params: {
    tagId: string;
  };
}

const TagIdPage: NextPage<TagIdPageProps> = async ({ params }) => {
  const tag = await db.tag.findUnique({
    where: { id: params.tagId },
    select: {
      name: true,
      _count: true,
      createdAt: true
    }
  });

  return (
    <div className='grid grid-flow-row gap-2 w-[40%] mx-auto'>
      <div className='grid grid-flow-col w-max gap-2 place-items-center'>
        <span className='text-lg font-semibold'>Threads containing</span>
        <div className='bg-blue-500/25 p-1 rounded-md grid grid-cols-[max-content_max-content] place-items-center w-max mx-auto'>
          <Hash className='w-5 h-5' />
          <span className='text-lg'>{tag?.name}</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2 place-items-center'>
        <p className='mr-auto uppercase text-xs font-bold text-zinc-500'>Tag created {formatDateLong(tag!.createdAt.toString())}</p>
        <p className='ml-auto uppercase text-xs font-bold text-zinc-500 '>{tag?._count.threads} Threads</p>
      </div>
      <TagThreads tagId={params.tagId} />
    </div>
  );
};

export default TagIdPage;
