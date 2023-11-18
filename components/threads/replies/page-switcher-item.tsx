import { Link } from "@/components/link";
import { FC } from "react";

interface RepliesPageSwitcherItemProps {
  threadId: string;
  pageNum: number;
}

export const RepliesPageSwitcherItem: FC<RepliesPageSwitcherItemProps> = ({ threadId, pageNum }) => {
  return (
    <Link href={`/forums/threads/${threadId}/${pageNum}`}>
      <div>a</div>
    </Link>
  );
};
