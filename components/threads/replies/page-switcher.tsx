"use client";

import { RepliesPageSwitcherItem } from "@/components/threads/replies/page-switcher-item";
import { cn } from "@/lib/utils";
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

  const renderSwitchItems = () => {
    const switchItems = [];

    if (totalPages === 1) {
      switchItems.push(<RepliesPageSwitcherItem key={1} threadId={threadId} pageNum={1} />);
      return switchItems;
    }

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        switchItems.push(<RepliesPageSwitcherItem key={i} threadId={threadId} pageNum={i} />);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          switchItems.push(<RepliesPageSwitcherItem key={i} threadId={threadId} pageNum={i} />);
        }
        switchItems.push(<RepliesPageSwitcherItem key={totalPages} threadId={threadId} pageNum={totalPages} />);
      } else if (page >= totalPages - 2) {
        switchItems.push(<RepliesPageSwitcherItem key={1} threadId={threadId} pageNum={1} />);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          switchItems.push(<RepliesPageSwitcherItem key={i} threadId={threadId} pageNum={i} />);
        }
      } else {
        switchItems.push(<RepliesPageSwitcherItem key={1} threadId={threadId} pageNum={1} />);
        switchItems.push(<RepliesPageSwitcherItem key={page - 1} threadId={threadId} pageNum={page - 1} />);
        switchItems.push(<RepliesPageSwitcherItem key={page} threadId={threadId} pageNum={page} />);
        switchItems.push(<RepliesPageSwitcherItem key={page + 1} threadId={threadId} pageNum={page + 1} />);
        switchItems.push(<RepliesPageSwitcherItem key={totalPages} threadId={threadId} pageNum={totalPages} />);
      }
    }

    return switchItems;
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 rounded-md p-2 overflow-auto w-max mx-auto">
      <div
        className={cn(
          "grid rounded-md overflow-hidden",
          totalPages === 1 && "grid-cols-1",
          totalPages === 2 && "grid-cols-2",
          totalPages === 3 && "grid-cols-3",
          totalPages === 4 && "grid-cols-4",
          totalPages >= 5 && "grid-cols-5"
        )}
      >
        {renderSwitchItems()}
      </div>
    </div>
  );
};
