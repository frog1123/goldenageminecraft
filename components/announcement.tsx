import { Pin } from 'lucide-react';
import { FC } from 'react';

interface AnnouncementProps {
  title: string;
  content?: string;
  imageUrls?: string[];
}

export const Announcement: FC<AnnouncementProps> = ({ title, content, imageUrls }) => {
  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 overflow-auto'>
      <div className='grid grid-cols-[max-content_auto] gap-1 place-items-center w-max'>
        <Pin className='w-4 h-4 text-zinc-500' />
        <span className='uppercase text-xs font-bold text-zinc-500'>ANNOUNCEMENT</span>
      </div>
      <p className='font-semibold text-lg break-words w-max'>{title}</p>
      <p className='break-words'>{content}</p>
      {imageUrls && imageUrls.map(img => <img src={img} />)}
    </div>
  );
};
