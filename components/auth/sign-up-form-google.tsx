"use client";

import { logo } from "@/lib/logo";
import { FC } from "react";
import Image from "next/image";

export const SignUpFormGoogle: FC = () => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md overflow-hidden">
      <div className="bg-emerald-500 h-1 hidden sm:block"></div>
      <div className="p-4">
        <div className="grid grid-cols-[max-content_auto] gap-1 mx-auto w-max place-items-center">
          <div className="w-5 h-5 relative">
            <Image src={logo()} alt="logo" fill />
          </div>
          <span className="uppercase text-xl font-bold text-zinc-500 dark:text-white">Register</span>
        </div>
        <p>google</p>
      </div>
    </div>
  );
};
