'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import { FC } from 'react';
import { ModeToggle } from '@/components/theme/mode-toggle';

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 py-2 px-4 w-full flex gap-2 fixed'>
      <div className='max-h-[32px] grid place-items-center'>
        <ModeToggle />
      </div>
      <div className='ml-auto w-max'>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
        <SignedOut>
          <button onClick={() => router.push('/sign-in')} className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
            <p className='text-white'>Sign in</p>
          </button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
