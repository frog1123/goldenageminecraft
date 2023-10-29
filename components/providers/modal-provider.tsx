'use client';

import { useEffect, useState } from 'react';
import { ShareThreadModal } from '../modals/share-thread-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ShareThreadModal />
    </>
  );
};
