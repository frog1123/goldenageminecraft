import { NextPage } from "next";

interface ReplyIdPageProps {
  params: {
    replyId: string;
  };
}

const ReplyIdPage: NextPage<ReplyIdPageProps> = ({ params }) => {
  return (
    <div>
      <p>reply {params.replyId}</p>
    </div>
  );
};

export default ReplyIdPage;
