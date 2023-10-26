import { FC } from 'react';
import Image from 'next/image';
import { UserWithoutEmail } from '@/types';
import { formatDateLong } from '@/utils/format-date-long';

interface UserInfoProps {
  user: UserWithoutEmail;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2'>
      <div className='grid place-items-center'>
        <div className='relative w-40 h-40 rounded-[50%] overflow-hidden'>
          <Image src={user.imageUrl} alt='author' fill />
        </div>
        <p className='text-xl'>{user.name}</p>
        {user.bio && <p>{user.bio}</p>}
        <p>Joined {formatDateLong(user.createdAt.toString())}</p>
      </div>
    </div>
  );
};

export default UserInfo;
