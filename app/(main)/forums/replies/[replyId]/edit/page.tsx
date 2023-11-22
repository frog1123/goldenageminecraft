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

  const thread = await db.threadReply.findUnique({
    where: {
      id: params.replyId
    },
    select: {
      id: true,
      authorId: true,
      content: true
    }
  });

  if (!currentUser || thread?.authorId !== currentUser.id) return redirect("/");
  if (!thread) return redirect("/");

  return (
    <div>
      <p>edit {params.replyId}</p>
    </div>
  );
};

export default ReplyIdEditPage;
