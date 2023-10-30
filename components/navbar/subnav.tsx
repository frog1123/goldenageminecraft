// 'use client';

// import { FC, useState } from 'react';
// import Link from '@/components/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import { motion } from 'framer-motion';

// const subnavItems = [
//   {
//     href: '/',
//     name: 'Home'
//   },
//   {
//     href: '/forums',
//     name: 'Forums'
//   },
//   {
//     href: '/rules',
//     name: 'Rules'
//   }
// ];

// export const Subnav: FC = () => {
//   let pathname = usePathname() || '/';

//   const [hoveredPath, setHoveredPath] = useState(pathname);

//   return (
//     <div className='bg-neutral-200 dark:bg-neutral-900 p-2 sm:rounded-md'>
//       <div className='flex gap-2 relative justify-start w-full z-[100] rounded-lg'>
//         {subnavItems.map((item, index) => {
//           const isActive = item.href === pathname;

//           return (
//             <Link href={item.href} key={index}>
//               <div data-active={isActive} onMouseOver={() => setHoveredPath(item.href)} onMouseLeave={() => setHoveredPath(pathname)}>
//                 <button className={cn('rounded-md px-2 transition h-[32px]', isActive ? 'text-zinc-100' : 'text-zinc-400')}>
//                   <span className='text-white'>{item.name}</span>
//                   {item.href === hoveredPath && (
//                     <motion.div
//                       className='absolute bottom-0 left-0 h-full bg-stone-800/80 rounded-md -z-10'
//                       layoutId='navbar'
//                       aria-hidden='true'
//                       style={{
//                         width: '100%'
//                       }}
//                       transition={{
//                         type: 'spring',
//                         bounce: 0.25,
//                         stiffness: 130,
//                         damping: 9,
//                         duration: 0.3
//                       }}
//                     />
//                   )}
//                 </button>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

'use client';

import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navItems = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/forums',
    name: 'Forums'
  },
  {
    path: '/rules',
    name: 'Rules'
  }
];

export const Subnav: FC = () => {
  let pathname = usePathname() || '/';

  if (pathname.includes('/writing/')) {
    pathname = '/writing';
  }

  const [currentPath, setCurrentPath] = useState(pathname);

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 p-2 w-full flex gap-2 rounded-md'>
      <nav className='flex gap-2 relative justify-start w-full z-[20]'>
        {navItems.map(item => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              className={cn('p-1 rounded-md relative no-underline duration-300 ease-in', !isActive && 'text-gray-500')}
              data-active={isActive}
              href={item.path}
              onClick={() => setCurrentPath(item.path)}
            >
              <span>{item.name}</span>
              {item.path === currentPath && (
                <motion.div
                  className='absolute bottom-0 left-0 h-full bg-gray-500/20 dark:bg-white/20 rounded-md -z-10'
                  layoutId='navbar'
                  aria-hidden='true'
                  style={{
                    width: '100%'
                  }}
                  transition={{
                    duration: 0.3
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
