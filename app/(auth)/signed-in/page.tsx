import { getCurrentUser } from '@/lib/current-user';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const SignedInPage: NextPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) return redirect('/');

  if (!currentUser)
    return (
      <div className='text-center'>
        <p>Something went wrong :/</p>
        <p>Try refreshing the page</p>
      </div>
    );

  return (
    <div>
      <p>Please wait...</p>
    </div>
  );
};

export default SignedInPage;
