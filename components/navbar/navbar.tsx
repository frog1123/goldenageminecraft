'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FC } from 'react';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { usePathname } from 'next/navigation';
import { ChevronRight, Hexagon } from 'lucide-react';
import Path from '@/components/navbar/path';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Navbar: FC = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/');

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 py-2 px-4 w-full flex gap-2 fixed'>
      <div className='max-h-[32px] grid place-items-center'>
        <ModeToggle />
      </div>
      <div className='grid grid-flow-col place-items-center'>
        <div className='grid grid-flow-col gap-2 place-items-center'>
          <Link href='/'>
            <div className='hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md'>
              <Hexagon className='w-5 h-5' />
            </div>
          </Link>
          {pathname !== '/' && <ChevronRight className='w-4 h-4 text-gray-500' />}
        </div>
        {pathnames.map((path, index) => {
          let routeTo = `${pathnames.slice(0, index + 1).join('/')}`;

          if (routeTo === '' || routeTo === '/') return null;

          return (
            <div className={cn('grid grid-flow-col place-items-center gap-2', index !== 0 && 'ml-2')} key={path}>
              <Path path={path} route={routeTo} />
              {index !== 0 && index !== pathnames.length - 1 && <ChevronRight className='w-4 h-4 text-gray-500' />}
            </div>
          );
        })}
      </div>
      <div className='ml-auto w-max'>
        <SignedIn>
          <UserButton afterSignOutUrl='/' userProfileMode='modal' />
        </SignedIn>
        <SignedOut>
          <div className='grid grid-cols-[max-content_max-content] gap-2'>
            <Link href='/sign-up'>
              <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
                <p className='text-white'>Sign up</p>
              </button>
            </Link>
            <Link href='/sign-in'>
              <button className='bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]'>
                <p className='text-white'>Sign in</p>
              </button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
