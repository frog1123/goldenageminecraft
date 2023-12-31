import { Control } from "@/components/control";
import { Threads } from "@/components/threads/threads";
import { db } from "@/lib/db";
import { BarChartBig, MessagesSquare, Users } from "lucide-react";
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

const ForumsPage: NextPage = async () => {
  const threadCount = await db.thread.count();
  const replyCount = await db.threadReply.count();
  const userCount = await db.user.count({
    where: {
      active: true
    }
  });

  return (
    <>
      <div className="w-full h-[60px] md:h-[100px] bg-forums-info-gradient sm:rounded-md p-2 overflow-auto">
        <div className="grid grid-cols-3 place-items-center h-full px-2 md:px-10">
          <div className="w-max grid grid-cols-[max-content_auto] place-items-center gap-1 fade-up" style={{ animationDelay: "100ms" }}>
            <BarChartBig className="w-6 h-6 text-white" />
            <span className="text-md font-semibold text-white">
              {threadCount} Thread{threadCount !== 1 && "s"}
            </span>
          </div>
          <div className="w-max grid grid-cols-[max-content_auto] place-items-center gap-1 fade-up" style={{ animationDelay: "300ms" }}>
            <MessagesSquare className="w-6 h-6 text-white" />
            <span className="text-md font-semibold text-white">
              {replyCount} {replyCount !== 1 ? "Replies" : "Reply"}
            </span>
          </div>
          <div className="w-max grid grid-cols-[max-content_auto] place-items-center gap-1 fade-up" style={{ animationDelay: "500ms" }}>
            <Users className="w-6 h-6 text-white" />
            <span className="text-md font-semibold text-white">
              {userCount} User{userCount !== 1 && "s"}
            </span>
          </div>
        </div>
      </div>
      <Control />
      <Threads />
    </>
  );
};

export default ForumsPage;
