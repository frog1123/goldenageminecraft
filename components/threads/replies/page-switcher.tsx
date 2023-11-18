"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";

interface RepliesPageSwitcherProps {
  totalReplies: number;
}

export const RepliesPageSwitcher: FC<RepliesPageSwitcherProps> = ({ totalReplies }) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/");

  let page = parseInt(pathnames[4]);
  if (pathnames.length < 5) page = 1;

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-flow-row gap-2 w-max mx-auto">
      <p>
        page t:{totalReplies} p:{page}
      </p>
    </div>
  );
};
