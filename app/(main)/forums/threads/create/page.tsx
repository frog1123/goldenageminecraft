import { Subnav } from '@/components/navbar/subnav';
import CreateThreadForm from '@/components/threads/create-form';
import { getCurrentUser } from '@/lib/current-user';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const ThreadsCreatePage: NextPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect('/sign-in');

  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Subnav />
      <CreateThreadForm />
    </div>
  );
};

export default ThreadsCreatePage;
