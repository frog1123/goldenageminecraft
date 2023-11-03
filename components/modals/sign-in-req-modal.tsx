"use client";

import { useModal } from "@/hooks/use-modal-store";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignInReqModal: FC = () => {
  const modal = useModal();
  const router = useRouter();

  const isModalOpen = modal.isOpen && modal.type === "sign-in-req";

  const handleSignIn = () => {
    router.push("/sign-in");
    modal.onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">You need to sign in to do this</DialogTitle>
        </DialogHeader>
        <div className="grid place-items-center">
          <Button onClick={handleSignIn} size="icon" className="border bg-white hover:bg-neutral-200 transition px-10 w-max">
            Sign in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
