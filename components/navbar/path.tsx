import Link from 'next/link';
import { FC } from 'react';

interface PathProps {
  path: string;
  route: string;
}

const Path: FC<PathProps> = ({ path, route }) => {
  return (
    <Link href={route}>
      <p>{path}</p>
    </Link>
  );
};

export default Path;
