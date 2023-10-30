'use client';

import { useEffect, useState } from 'react';
import { ShareThreadModal } from '@/components/modals/share-thread-modal';
import { SignOutConfModal } from '@/components/modals/sign-out-conf-modal';

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
    </>
  );
};
