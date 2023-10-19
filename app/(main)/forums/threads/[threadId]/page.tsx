import { NextPage } from 'next';

interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage: NextPage<ThreadIdPageProps> = async ({ params }) => {
  return (
    <div>
      <p>{params.threadId}</p>
    </div>
  );
};

export default ThreadIdPage;
