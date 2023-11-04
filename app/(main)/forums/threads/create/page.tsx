import CreateThreadForm from "@/components/threads/create-form";
import { getCurrentUser } from "@/lib/current-user";
import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create thread",
  description: "This is the thread create page"
};

const ThreadsCreatePage: NextPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <>
      <CreateThreadForm />
    </>
  );
};

export default ThreadsCreatePage;
