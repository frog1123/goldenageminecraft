import TagThreads from '@/components/threads/tag-threads';
import { Hash } from 'lucide-react';
import { NextPage } from 'next';

interface TagIdPageProps {
  params: {
    tagId: string;
  };
}

const TagIdPage: NextPage<TagIdPageProps> = async ({ params }) => {
  return (
    <div className='grid grid-flow-row gap-2 w-[40%] mx-auto'>
      <div className='grid grid-flow-col w-max gap-2 place-items-center'>
        <span className='text-lg font-semibold'>Posts containing</span>
        <div className='bg-blue-500/25 p-1 rounded-md grid grid-cols-[max-content_max-content] place-items-center w-max mx-auto'>
          <Hash className='w-5 h-5' />
          <span className='text-lg'>{params.tagId}</span>
        </div>
      </div>
      <TagThreads tagId={params.tagId} />
    </div>
  );
};

export default TagIdPage;
