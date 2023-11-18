"use client";

import { RepliesPageSwitcherItem } from "@/components/threads/replies/page-switcher-item";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface RepliesPageSwitcherProps {
  threadId: string;
  totalReplies: number;
}

export const RepliesPageSwitcher: FC<RepliesPageSwitcherProps> = ({ threadId, totalReplies }) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/");

  let page = parseInt(pathnames[4]);
  if (pathnames.length < 5) page = 1;

  const totalPages = Math.ceil(totalReplies / 5);

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto grid grid-flow-row gap-2 w-max mx-auto">
      {totalPages === 1 && (
        <div className="grid grid-cols-1">
          <RepliesPageSwitcherItem threadId={threadId} pageNum={page} />
        </div>
      )}

      <p>
        page t:{totalPages} p:{page}
      </p>
    </div>
  );
};
