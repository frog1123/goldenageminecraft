'use client';

import { useModal } from '@/hooks/use-modal-store';
import { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';

export const SignOutConfModal: FC = () => {
  const modal = useModal();
  const { signOut } = useClerk();

  const isModalOpen = modal.isOpen && modal.type === 'sign-out-conf';

  const handleSignOut = () => {
    signOut();
    modal.onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Sign out confirmation</DialogTitle>
          <DialogDescription>Are sure you want to sign out?</DialogDescription>
        </DialogHeader>
        <div className='grid place-items-center'>
          <Button onClick={handleSignOut} size='icon' className='border bg-white hover:bg-neutral-200 transition px-10'>
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
