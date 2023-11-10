"use client";

import { useModal } from "@/hooks/use-modal-store";
import { FC, useContext } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Context } from "@/context";
import { useRouter } from "next/navigation";

export const SignOutConfModal: FC = () => {
  const modal = useModal();
  const context = useContext(Context);
  const router = useRouter();

  const isModalOpen = modal.isOpen && modal.type === "sign-out-conf";

  const handleSignOut = () => {
    // signOut();

    context.setValue({
      ...context.value,
      currentUser: {
        clerkId: null,
        id: null
      }
    });
    router.push("/"); // home

    modal.onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Sign out confirmation</DialogTitle>
          <DialogDescription className="text-center">Are sure you want to sign out?</DialogDescription>
        </DialogHeader>
        <div className="grid place-items-center">
          <Button onClick={handleSignOut} size="icon" className="border bg-white hover:bg-neutral-200 transition px-10 w-max">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
