"use client";

import { motion } from "framer-motion";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/forums",
    name: "Forums"
  },
  {
    path: "/rules",
    name: "Rules"
  }
];

export const Subnav: FC = () => {
  let pathname = usePathname() || "/";

  if (pathname.startsWith("/forums")) {
    pathname = "/forums";
  }

  const [currentPath, setCurrentPath] = useState(pathname);

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 p-2 w-full flex gap-2 sm:rounded-md">
      <div className="flex gap-2 relative justify-start w-full z-[20]">
        {navItems.map(item => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              className={cn("p-1 rounded-md relative no-underline duration-300 ease-in", !isActive && "text-gray-500")}
              data-active={isActive}
              href={item.path}
              onClick={() => setCurrentPath(item.path)}
            >
              <span>{item.name}</span>
              {item.path === pathname && (
                <motion.div
                  className="absolute bottom-0 left-0 h-full bg-gray-500/20 dark:bg-white/20 rounded-md -z-10"
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{
                    width: "100%"
                  }}
                  transition={{
                    duration: 0.3
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
