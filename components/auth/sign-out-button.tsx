"use client";

import { LogIn } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface SignOutButtonProps {
  text?: string;
  afterSignOutUrl: string;
}

export const SignOutButton: FC<SignOutButtonProps> = ({ text, afterSignOutUrl }) => {
  const router = useRouter();

  const handleClick = async () => {
    await signOut();
    router.push(afterSignOutUrl);
  };

  return (
    <button onClick={handleClick} className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px] text-white">
      <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
        <LogIn className="w-4 h-4" />
        <span>{text ? text : "Sign out"}</span>
      </div>
    </button>
  );
};
