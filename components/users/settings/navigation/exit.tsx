"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const UserSettingsExit: FC = () => {
  const router = useRouter();

  const handleExit = () => {
    router.push("/");
  };

  return (
    <button
      className="transition rounded-[50%] border-zinc-500 text-zinc-500 dark:border-white dark:text-white border-2 hover:text-zinc-800 hover:border-zinc-800 dark:hover:text-zinc-700 dark:hover:border-zinc-700 p-1 mt-4"
      onClick={handleExit}
    >
      <X className="w-6 h-6" />
    </button>
  );
};
