'use client';

import { useModal } from '@/hooks/use-modal-store';
import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';

export const SignOutConfModal: FC = () => {
  const modal = useModal();
  const origin = useOrigin();

  const isModalOpen = modal.isOpen && modal.type === 'sign-out-conf';

  const [copied, setCopied] = useState(false);

  const threadLink = `${origin}/threads/${modal.data.thread?.id}`;

  const onCopy = () => {
    navigator.clipboard.writeText(threadLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Sign out confirmation</DialogTitle>
          <DialogDescription>Are sure you want to sign out?</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2 grid-cols-[auto_max-content] w-full'>
          <Input className='focus-visible:ring-0 focus-visible:ring-offset-0 w-full' value={threadLink} readOnly />
          <Button onClick={onCopy} size='icon' className='border bg-white hover:bg-neutral-200 transition'>
            {copied ? <Check className='w-4 h-4 text-black' /> : <Copy className='w-4 h-4 text-black' />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
