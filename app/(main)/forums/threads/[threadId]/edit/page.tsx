import EditThreadForm from "@/components/threads/edit-form";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile edit",
  description: "This is the profile edit page",
  openGraph: {
    title: "Profile edit",
    description: "This is the profile edit page"
  }
};

interface ThreadIdEditPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdEditPage: NextPage<ThreadIdEditPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser();

  const thread = await db.thread.findUnique({
    where: {
      id: params.threadId
    },
    select: {
      authorId: true,
      title: true,
      content: true,
      tags: {
        select: {
          name: true
        }
      }
    }
  });

  console.log(thread);

  if (!currentUser || thread?.authorId !== currentUser.id) return redirect("/");

  if (!thread) return redirect("/");

  return (
    <div>
      <p>edit thread</p>
      <div>
        <EditThreadForm thread={thread} />
      </div>
    </div>
  );
};

export default ThreadIdEditPage;
