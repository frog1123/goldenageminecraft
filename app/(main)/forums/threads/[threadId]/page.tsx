import PageNotFound from '@/components/page-not-found';
import { db } from '@/lib/db';
import { NextPage } from 'next';

interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage: NextPage<ThreadIdPageProps> = async ({ params }) => {
  const thread = await db.thread.findUnique({
    where: {
      id: params.threadId
    }
  });

  if (!thread) return <PageNotFound message='Thread not found :/' />;

  return (
    <div className='grid grid-flow-row gap-2 w-[40%] mx-auto'>
      <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-cols-[auto_max-content] gap-2'>
        <p>{thread?.title}</p>
      </div>
    </div>
  );
};

export default ThreadIdPage;
