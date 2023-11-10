"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

interface SignOutButtonProps {
  text?: string;
  afterSignOutUrl: string;
}

export const SignOutButton: FC<SignOutButtonProps> = ({ text, afterSignOutUrl }) => {
  const router = useRouter();

  const handleClick = async () => {
    // await signOut();
    router.push(afterSignOutUrl);
  };

  return (
    <button onClick={handleClick} className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px]">
      <p className="text-white">{text ? text : "Sign out"}</p>
    </button>
  );
};
