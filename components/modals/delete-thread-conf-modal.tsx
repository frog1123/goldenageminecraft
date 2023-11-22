"use client";

import { useModal } from "@/hooks/use-modal-store";
import { FC, useContext } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Context } from "@/context";
import { useRouter } from "next/navigation";

export const DeleteThreadConfModal: FC = () => {
  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "delete-thread-conf";
  const context = useContext(Context);

  const router = useRouter();

  const handleDeleteThread = async () => {
    if (!modal.data.deleteThreadConf?.threadId) return;

    await axios.delete(`/api/threads/?id=${modal.data.deleteThreadConf.threadId}`);

    if (modal.data.deleteThreadConf.redirectToHome) router.push("/forums");

    context.setValue({ ...context.value, deletedThread: { id: modal.data.deleteThreadConf.threadId } });

    modal.onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete thread confirmation</DialogTitle>
          <DialogDescription className="text-center">Are sure you want to delete this thread?</DialogDescription>
        </DialogHeader>
        <div className="grid place-items-center">
          <Button onClick={handleDeleteThread} size="icon" className="text-black border bg-white hover:bg-neutral-200 transition px-10 w-max">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
