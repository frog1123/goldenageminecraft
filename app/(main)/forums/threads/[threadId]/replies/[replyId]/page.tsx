import { db } from "@/lib/db";
import { NextPage } from "next";

interface ReplyIdPageProps {
  params: {
    threadId: string;
    replyId: string;
  };
}

const ReplyIdPage: NextPage<ReplyIdPageProps> = async ({ params }) => {
  const reply = await db.threadReply.findFirst({
    where: {
      id: params.replyId
    },
    select: {
      createdAt: true
    }
  });

  if (!reply)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <p className="text-center">:( Reply does not exist or cannot be found</p>
      </div>
    );

  const replyCreatedAt = reply.createdAt;

  const position = await db.threadReply.count({
    where: {
      threadId: params.threadId,
      createdAt: {
        lte: replyCreatedAt
      }
    }
  });

  return (
    <div>
      <p>thread {params.threadId}</p>
      <p>reply {params.replyId}</p>
      <p>reply position {position}</p>
    </div>
  );
};

export default ReplyIdPage;
