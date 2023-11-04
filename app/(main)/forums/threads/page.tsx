import Control from "@/components/control";
import Threads from "@/components/threads/threads";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Forums",
  description: "This is the forum page",
  openGraph: {
    title: "Forums",
    description: "This is the forum page",
    images: ["/logo.png"]
  }
};

const ThreadsPage: NextPage = async () => {
  return (
    <>
      <Control />
      <Threads />
    </>
  );
};

export default ThreadsPage;
