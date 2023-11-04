import { Metadata, NextPage } from "next";
import { Announcement } from "@/components/announcement";
import img1 from "@/public/assets/announcements/img1.png";

export const metadata: Metadata = {
  description: "This is the home page"
};

const Home: NextPage = async () => {
  return (
    <>
      <Announcement title="Welcome to goldenageminecraft!" content="This is a forum website for discussing all things related to old minecraft!" imageUrls={[img1]} />
      <Announcement title="NOTICE" content="THIS SITE IS IN NO WAY OFFICIALLY AFFILIATED WITH THE /r/GoldenAgeMinecraft SUBREDDIT, MOJANG AB, OR THE MICROSOFT CORPORATION." />
      <Announcement title="NOTICE" content="This website is still in development and the database may be cleared without notice." />
    </>
  );
};

export default Home;
