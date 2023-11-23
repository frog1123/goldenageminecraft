"use client";

import { Link } from "@/components/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface RepliesPageSwitcherItemProps {
  threadId: string;
  pageNum: number;
}

export const RepliesPageSwitcherItem: FC<RepliesPageSwitcherItemProps> = ({ threadId, pageNum }) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/");

  let page = parseInt(pathnames[4]);
  if (pathnames.length < 5) page = 1;

  return (
    <Link href={`/forums/threads/${threadId}/${pageNum}`}>
      <div
        className={cn(
          "px-2 py-1 transition",
          pageNum === page ? "bg-emerald-500 text-white" : "dark:text-white bg-gray-300 hover:bg-gray-400 dark:bg-gray-500 dark:hover:bg-gray-600"
        )}
      >
        <span>{pageNum}</span>
      </div>
    </Link>
  );
};
