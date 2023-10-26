import { getCurrentUser } from '@/lib/current-user';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const SignedInPage: NextPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) return redirect('/');

  if (!currentUser)
    return (
      <div>
        <p>Something went wrong :/</p>
      </div>
    );

  return (
    <div>
      <p>Please wait...</p>
    </div>
  );
};

export default SignedInPage;
