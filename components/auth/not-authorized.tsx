"use client";

import { Home } from "lucide-react";
import { signOut } from "next-auth/react";
import { FC, useEffect, useState } from "react";

export const NotAuthorized: FC = () => {
  const [mounted, setMounted] = useState(false);

  const handleClick = async () => {
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md overflow-hidden">
      <div className="bg-emerald-500 h-1 hidden sm:block"></div>
      <div className="p-4">
        <p className="text-center">You couldn&apos;t be authorized</p>
        <p className="text-center">Make sure you have a registered account</p>
        <div className="w-full grid place-items-center mt-2">
          <button onClick={() => handleClick()} className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px] text-white">
            <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
              <Home className="w-4 h-4" />
              <span>Return home</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
