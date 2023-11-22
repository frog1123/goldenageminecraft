import { EditReplyForm } from "@/components/threads/replies/edit-form";
import { getServerCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextPage } from "next";
import { redirect } from "next/navigation";

interface ReplyIdEditPageProps {
  params: {
    replyId: string;
  };
}

const ReplyIdEditPage: NextPage<ReplyIdEditPageProps> = async ({ params }) => {
  const currentUser = await getServerCurrentUser();

  const reply = await db.threadReply.findUnique({
    where: {
      id: params.replyId
    },
    select: {
      id: true,
      authorId: true,
      content: true
    }
  });

  if (!currentUser || reply?.authorId !== currentUser.id) return redirect("/");
  if (!reply) return redirect("/");

  return (
    <div>
      <EditReplyForm reply={reply} />
    </div>
  );
};

export default ReplyIdEditPage;
