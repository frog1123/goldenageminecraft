"use client";

import { signIn } from "next-auth/react";
import { FC } from "react";

export const SignInButton: FC = () => {
  return (
    <button onClick={() => signIn()} className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]">
      sign in
    </button>
  );
};
