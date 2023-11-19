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
  const maxCols = Math.min(totalPages, 5);

  const renderSwitchItems = () => {
    const switchItems = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        switchItems.push(<RepliesPageSwitcherItem key={i} threadId={threadId} pageNum={i} />);
      }
    } else if (page <= 3) {
      for (let i = 1; i <= maxCols - 1; i++) {
        switchItems.push(<RepliesPageSwitcherItem key={i} threadId={threadId} pageNum={i} />);
      }
      switchItems.push(<RepliesPageSwitcherItem key={totalPages} threadId={threadId} pageNum={totalPages} />);
    } else if (page >= totalPages - 2) {
      switchItems.push(<RepliesPageSwitcherItem key={1} threadId={threadId} pageNum={1} />);
      for (let i = totalPages - maxCols + 2; i <= totalPages; i++) {
        switchItems.push(<RepliesPageSwitcherItem key={i} threadId={threadId} pageNum={i} />);
      }
    } else {
      for (let i = page - 2; i <= page + 2; i++) {
        switchItems.push(<RepliesPageSwitcherItem key={i} threadId={threadId} pageNum={i} />);
      }
    }
    return switchItems;
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto w-max mx-auto">
      <div className={`grid grid-flow-row grid-cols-${maxCols} rounded-md overflow-hidden`}>{renderSwitchItems()}</div>
    </div>
  );
};
