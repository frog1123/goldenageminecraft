import { NextPage } from 'next';

interface UserIdEditPageProps {
  params: {
    userId: string;
  };
}

const UserIdEditPage: NextPage<UserIdEditPageProps> = async ({ params }) => {
  return (
    <div>
      <p>user edit {params.userId}</p>
    </div>
  );
};

export default UserIdEditPage;
