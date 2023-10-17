import CreateThreadForm from '@/components/threads/create-form';
import { getCurrentUser } from '@/lib/current-user';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const ThreadsCreatePage: NextPage = async () => {
  const currentUser = await getCurrentUser();
  console.log('user', currentUser);

  if (!currentUser) return redirect('/sign-in');

  return (
    <div className='w-[40%] mx-auto'>
      <CreateThreadForm />
    </div>
  );
};

export default ThreadsCreatePage;
