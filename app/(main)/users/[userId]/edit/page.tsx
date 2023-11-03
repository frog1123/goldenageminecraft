import { EditUserForm } from '@/components/users/edit-form';
import { getCurrentUser } from '@/lib/current-user';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

interface UserIdEditPageProps {
  params: {
    userId: string;
  };
}

const UserIdEditPage: NextPage<UserIdEditPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || params.userId !== currentUser.id) {
    return redirect('/');
  }

  return (
    <div>
      <EditUserForm user={currentUser} />
    </div>
  );
};

export default UserIdEditPage;
