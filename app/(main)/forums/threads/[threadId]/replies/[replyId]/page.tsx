import { NextPage } from "next";

interface ReplyIdPageProps {
  params: {
    threadId: string;
    replyId: string;
  };
}

const ReplyIdPage: NextPage<ReplyIdPageProps> = ({ params }) => {
  return (
    <div>
      <p>thread {params.threadId}</p>
      <p>reply {params.replyId}</p>
    </div>
  );
};

export default ReplyIdPage;
