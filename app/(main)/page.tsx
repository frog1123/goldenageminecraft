import { NextPage } from 'next';
import Link from '@/components/link';
import { Announcement } from '@/components/announcement';

const Home: NextPage = async () => {
  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <div className='bg-neutral-200 dark:bg-neutral-900 p-2 sm:rounded-md'>
        <Link href='/forums'>
          <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
            <p className='text-white'>Forums</p>
          </button>
        </Link>
      </div>

      <Announcement
        title='NOTICE'
        content='THIS SITE IS IN NO WAY OFFICIALLY AFFILIATED WITH THE /r/GoldenAgeMinecraft/ SUBREDDIT, MOJANG AB, OR THE MICROSOFT CORPORATION.'
      />
      <Announcement title='NOTICE' content='This website is still in development and the database may be cleared without notice.' />
    </div>
  );
};

export default Home;
