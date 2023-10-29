'use client';

import { useModal } from '@/hooks/use-modal-store';
import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy } from 'lucide-react';

export const ShareThreadModal: FC = () => {
  const modal = useModal();

  const isModalOpen = modal.isOpen && modal.type === 'share-thread';

  const [copied, setCopied] = useState(false);

  console.log(modal);

  const threadLink = `/threads/${modal.data.thread?.id}`;

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
          <DialogTitle>Share thread</DialogTitle>
          <DialogDescription>Copy thread link</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2 grid-cols-[auto_max-content] w-full'>
          <Input className='focus-visible:ring-0 focus-visible:ring-offset-0 w-full' value={threadLink} readOnly />
          <Button onClick={onCopy} size='icon'>
            {copied ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
