import { FC } from 'react';
import Link from '@/components/link';
import { Hash } from 'lucide-react';

interface TagProps {
  id: string;
  name: string;
}

const Tag: FC<TagProps> = ({ id, name }) => {
  return (
    <Link href={`/forums/tags/${id}`}>
      <div className='bg-blue-500/25 p-1 rounded-md grid grid-cols-[max-content_max-content] place-items-center'>
        <Hash className='w-4 h-4' />
        <span className='items-center'>{name}</span>
      </div>
    </Link>
  );
};

export default Tag;
