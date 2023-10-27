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
      <div className='bg-blue-500/25 p-2 rounded-md grid grid-cols-[max-content_max-content] place-items-center w-max mx-auto'>
        <Hash className='w-6 h-6' />
        <span className='text-2xl'>{params.tagId}</span>
      </div>
      <TagThreads tagId={params.tagId} />
    </div>
  );
};

export default TagIdPage;
