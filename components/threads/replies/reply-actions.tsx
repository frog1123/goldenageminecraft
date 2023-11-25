"use client";

import { FC } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Share, Trash2 } from "lucide-react";
import { Link } from "@/components/link";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "@/components/ui/separator";
import { ThreadReplySignedType, ThreadReplyUnsignedType } from "@/types/threads";

interface ReplyActionsProps {
  threadId: string;
  reply: ThreadReplySignedType | ThreadReplyUnsignedType;
  canEdit: boolean;
}

export const ReplyActions: FC<ReplyActionsProps> = ({ threadId, reply, canEdit }) => {
  const modal = useModal();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[20]">
        <DropdownMenuItem className="cursor-pointer">
          <Link href={`/forums/threads/${threadId}/replies/${reply.id}`} className="w-full">
            <div className="flex place-items-center w-full gap-2">
              <span>View reply (wip)</span>
              <Eye className="w-4 h-4 ml-auto" />
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => modal.onOpen("share-reply", { shareReply: { threadId, replyId: reply.id } })} className="cursor-pointer">
          <div className="flex place-items-center w-full gap-2">
            <span>Share reply</span>
            <Share className="w-4 h-4 ml-auto" />
          </div>
        </DropdownMenuItem>
        {canEdit && (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <Link href={`/forums/threads/${threadId}/replies/${reply.id}/edit`} className="w-full">
                <div className="flex place-items-center w-full gap-2">
                  <span>Edit reply</span>
                  <Edit className="w-4 h-4 ml-auto" />
                </div>
              </Link>
            </DropdownMenuItem>
            <Separator className="my-1" />
            <DropdownMenuItem className="cursor-pointer">
              <button onClick={() => {}}>
                <div className="flex place-items-center w-full gap-2 text-red-500">
                  <span>Delete reply (wip)</span>
                  <Trash2 className="w-4 h-4 ml-auto" />
                </div>
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
