import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <div className='bg-neutral-900 py-2 px-4 w-full'>
      <div className='ml-auto w-max'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
