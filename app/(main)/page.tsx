import { NextPage } from 'next';

import { Announcement } from '@/components/announcement';
import img1 from '@/public/assets/announcements/img1.png';
import { Subnav } from '@/components/navigation/subnav';

const Home: NextPage = async () => {
  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Subnav />
      <Announcement title='Welcome to goldenageminecraft!' content='This is a forum website for discussing all things related to old minecraft!' imageUrls={[img1]} />
      <Announcement title='NOTICE' content='THIS SITE IS IN NO WAY OFFICIALLY AFFILIATED WITH THE /r/GoldenAgeMinecraft SUBREDDIT, MOJANG AB, OR THE MICROSOFT CORPORATION.' />
      <Announcement title='NOTICE' content='This website is still in development and the database may be cleared without notice.' />
    </div>
  );
};

export default Home;
