import { CreateThreadForm } from "@/components/threads/create-form";
import { getServerCurrentUser } from "@/lib/current-user";
import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create thread",
  description: "This is the thread create page",
  openGraph: {
    title: "Create thread",
    description: "This is the thread create page"
  }
};

const ThreadsCreatePage: NextPage = async () => {
  const cUser = await getServerCurrentUser();

  if (!cUser) return redirect("/sign-in");

  return (
    <>
      <CreateThreadForm />
    </>
  );
};

export default ThreadsCreatePage;
