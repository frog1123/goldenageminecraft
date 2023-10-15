import CreateThreadForm from '@/components/threads/create-form';
import { NextPage } from 'next';

const ThreadsCreatePage: NextPage = () => {
  return (
    <div className='w-[40%] mx-auto'>
      <CreateThreadForm />
    </div>
  );
};

export default ThreadsCreatePage;
