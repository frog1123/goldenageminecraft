'use client';

import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';
import { FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight, LogOut, Moon, Settings, Sun, User, Wrench } from 'lucide-react';
import Path from '@/components/navbar/path';
import Link from '@/components/link';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useTheme } from 'next-themes';
import grass_block_old from '@/public/assets/grass_block_old.png';
import Image from 'next/image';
import { dark } from '@clerk/themes';

const Navbar: FC = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/');

  const { user, signOut, openUserProfile } = useClerk();
  const [id, setId] = useState('');

  const { theme, systemTheme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetch = async () => {
      const idResponse = await axios.get(`/api/users/id?id=${user.id}`);
      setId(idResponse.data.id);
    };

    fetch();
  });

  return (
    <div className='fixed z-50 w-full'>
      <div className='bg-neutral-200 dark:bg-neutral-900 py-2 px-4 w-full flex gap-2'>
        <div className='grid grid-flow-col place-items-center'>
          <div className='grid grid-flow-col gap-2 place-items-center h-full'>
            <Link href='/' className='h-full'>
              <div className='hover:bg-neutral-300 dark:hover:bg-neutral-800 h-full aspect-square grid place-items-center transition rounded-md'>
                <Image src={grass_block_old} className='w-5 h-5' alt='logo' />
              </div>
            </Link>
            {pathname !== '/' && <ChevronRight className='ml-2 navbar-routes w-4 h-4 text-gray-500' />}
          </div>
          {pathnames.map((path, index) => {
            let routeTo = `${pathnames.slice(0, index + 1).join('/')}`;

            if (routeTo === '' || routeTo === '/') return null;

            return (
              <div className={cn('navbar-routes grid grid-flow-col place-items-center gap-2', index !== 0 && 'ml-2')} key={path}>
                <Path path={path} route={routeTo} />
                {index !== 0 && index !== pathnames.length - 1 && <ChevronRight className='w-4 h-4 text-gray-500' />}
              </div>
            );
          })}
        </div>
        <div className='ml-auto w-max grid place-items-center grid-flow-col'>
          <SignedIn>
            {user && (
              // modal needs to be false
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className='h-8 w-8 aspect-square rounded-[50%] overflow-hidden box-border cursor-pointer relative'>
                    <Image src={user.imageUrl} alt='author' fill objectPosition='relative' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem className='pointer-events-none'>
                    <div>
                      <span>{user.fullName ? user.fullName : user.username}</span>
                    </div>
                  </DropdownMenuItem>
                  <Separator className='my-1' />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <div className='flex place-items-center w-full gap-2'>
                      <span>Sign out</span>
                      <LogOut className='w-4 h-4 ml-auto' />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openUserProfile({ appearance: { baseTheme: theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? dark : undefined } })}
                  >
                    <div className='flex place-items-center w-full gap-2'>
                      <span>Manage account</span>
                      <Wrench className='w-4 h-4 ml-auto' />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/users/${id}`} className='w-full'>
                      <div className='flex place-items-center w-full gap-2'>
                        <span>View profile</span>
                        <User className='w-4 h-4 ml-auto' />
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className='flex items-center'>
                      <span>Set theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className='mr-1'>
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                          <div className='flex place-items-center w-full gap-2'>
                            <span>Light</span>
                            <Sun className='w-4 h-4 ml-auto' />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                          <div className='flex place-items-center w-full gap-2'>
                            <span>Dark</span>
                            <Moon className='w-4 h-4 ml-auto' />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                          <div className='flex place-items-center w-full gap-2'>
                            <span>System</span>
                            <Settings className='w-4 h-4 ml-auto' />
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SignedIn>
          <SignedOut>
            <div className='grid grid-cols-[max-content_max-content_max-content] gap-2 place-items-center'>
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
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className='ml-2 bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-800 h-full aspect-square grid place-items-center transition rounded-md'>
                    <Settings className='w-5 h-5 text-white' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-2'>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className='flex items-center'>
                      <span>Set theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className='mr-1'>
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                          <div className='flex place-items-center w-full gap-2'>
                            <span>Light</span>
                            <Sun className='w-4 h-4 ml-auto' />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                          <div className='flex place-items-center w-full gap-2'>
                            <span>Dark</span>
                            <Moon className='w-4 h-4 ml-auto' />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                          <div className='flex place-items-center w-full gap-2'>
                            <span>System</span>
                            <Settings className='w-4 h-4 ml-auto' />
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SignedOut>
        </div>
      </div>
      <Separator className={cn('transition-all duration-500 mx-auto bg-gray-300 dark:bg-border', scrolled ? 'w-full visible' : 'w-0 invisible')} />
    </div>
  );
};

export default Navbar;
