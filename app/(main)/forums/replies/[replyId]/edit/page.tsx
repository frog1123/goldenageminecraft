import { NextPage } from "next";

interface ReplyIdEditPageProps {
  params: {
    replyId: string;
  };
}

const ReplyIdEditPage: NextPage<ReplyIdEditPageProps> = ({ params }) => {
  return (
    <div>
      <p>edit {params.replyId}</p>
    </div>
  );
};

export default ReplyIdEditPage;
