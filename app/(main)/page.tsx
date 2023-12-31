import { Metadata, NextPage } from "next";
import { Announcement } from "@/components/announcement";
import img1 from "@/public/assets/announcements/img1.png";
import { Github } from "lucide-react";
import { DeployInfo } from "@/components/deploy-info";

export const metadata: Metadata = {
  description: "This is the home page",
  openGraph: {
    description: "This is the home page"
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const Home: NextPage = async () => {
  return (
    <>
      <Announcement title="Welcome to goldenageminecraft!" content="This is a forum website for discussing all things related to old minecraft!" imageUrls={[img1]} />
      <Announcement title="NOTICE" content="THIS SITE IS IN NO WAY OFFICIALLY AFFILIATED WITH THE /r/GoldenAgeMinecraft SUBREDDIT, MOJANG AB, OR THE MICROSOFT CORPORATION." />
      <DeployInfo />
      <Announcement title="NOTICE" content="This website is still in development and the database may be cleared without notice.">
        <a href="https://github.com/frog1123/goldenageminecraft" target="_blank" rel="noreferrer">
          <button className="bg-indigo-500 hover:bg-indigo-700 p-1 rounded-md transition mt-1">
            <div className="grid grid-cols-[max-content_auto] gap-1 place-items-center">
              <Github className="text-white h-4 w-4" />
              <span className="text-white">View development</span>
            </div>
          </button>
        </a>
      </Announcement>
    </>
  );
};

export default Home;
