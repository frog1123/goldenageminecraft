'use client';

import { useModal } from '@/hooks/use-modal-store';
import { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export const DeleteThreadConfModal: FC = () => {
  const modal = useModal();

  const isModalOpen = modal.isOpen && modal.type === 'delete-thread-conf';

  const handleDeleteThread = async () => {
    await axios.delete(`/api/threads/?id=${modal.data.deleteThreadConf?.threadId}`);

    modal.onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>Delete thread confirmation</DialogTitle>
          <DialogDescription className='text-center'>Are sure you want to delete this thread?</DialogDescription>
        </DialogHeader>
        <div className='grid place-items-center'>
          <Button onClick={handleDeleteThread} size='icon' className='border bg-white hover:bg-neutral-200 transition px-10 w-max'>
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
