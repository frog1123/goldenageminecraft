import { getInitalUser } from '@/lib/initial-user';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const SignedInPage: NextPage = async () => {
  const initalUser = await getInitalUser();

  if (initalUser) return redirect('/');

  return (
    <div>
      <p>Please wait...</p>
    </div>
  );
};

export default SignedInPage;
