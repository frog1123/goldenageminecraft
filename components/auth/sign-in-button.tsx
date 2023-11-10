"use client";

import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { FC } from "react";

export const SignInButton: FC = () => {
  return (
    <button onClick={() => signIn()} className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px] text-white">
      <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
        <LogIn className="w-4 h-4" />
        <span>Sign in</span>
      </div>
    </button>
  );
};
