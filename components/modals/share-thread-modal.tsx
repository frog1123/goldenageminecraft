'use client';

import { useModal } from '@/hooks/use-modal-store';
import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';

export const ShareThreadModal: FC = () => {
  const modal = useModal();
  const origin = useOrigin();

  const isModalOpen = modal.isOpen && modal.type === 'share-thread';

  const [copied, setCopied] = useState(false);

  const threadLink = `${origin}/forums/threads/${modal.data.shareThread?.threadId}`;

  const handleCopy = () => {
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
          <DialogTitle className='text-center'>Share thread</DialogTitle>
          <DialogDescription className='text-center'>Copy thread link</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2 grid-cols-[auto_max-content] w-full'>
          <Input className='focus-visible:ring-0 focus-visible:ring-offset-0 w-full' value={threadLink} readOnly />
          <Button onClick={handleCopy} size='icon' className='border bg-white hover:bg-neutral-200 transition w-max'>
            {copied ? <Check className='w-4 h-4 text-black' /> : <Copy className='w-4 h-4 text-black' />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
