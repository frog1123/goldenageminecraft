import dark_spinner from '@/public/assets/dark_spinner.svg';
import light_spinner from '@/public/assets/light_spinner.svg';
import { FC } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const LoadingIcon: FC = () => {
  const { theme } = useTheme();

  if (theme === 'dark')
    return (
      <div>
        <Image src={dark_spinner} alt='loading' />
      </div>
    );
  else
    return (
      <div>
        <Image src={light_spinner} alt='loading' />
      </div>
    );
};

export default LoadingIcon;
