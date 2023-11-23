"use client";

import { useEffect, useState } from "react";
import { ShareThreadModal } from "@/components/modals/share-thread-modal";
import { SignOutConfModal } from "@/components/modals/sign-out-conf-modal";
import { SignInReqModal } from "@/components/modals/sign-in-req-modal";
import { DeleteThreadConfModal } from "@/components/modals/delete-thread-conf-modal";
import { ShareReplyModal } from "@/components/modals/share-reply-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ShareThreadModal />
      <SignOutConfModal />
      <SignInReqModal />
      <DeleteThreadConfModal />
      <ShareReplyModal />
    </>
  );
};
