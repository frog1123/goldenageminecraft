import CreateThreadForm from "@/components/threads/create-form";
import { getCurrentUser } from "@/lib/current-user";
import { NextPage } from "next";
import { redirect } from "next/navigation";

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
