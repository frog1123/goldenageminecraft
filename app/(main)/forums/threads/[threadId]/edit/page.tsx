import { NextPage } from 'next';

interface ThreadIdEditPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdEditPage: NextPage<ThreadIdEditPageProps> = async ({ params }) => {
  return (
    <div>
      <p>edit thread</p>
      <p>{params.threadId}</p>
    </div>
  );
};

export default ThreadIdEditPage;
