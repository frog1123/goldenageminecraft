import { Link } from "@/components/link";
import { FC } from "react";

interface PathProps {
  path: string;
  route: string;
}

const Path: FC<PathProps> = ({ path, route }) => {
  return (
    <Link href={route}>
      <p className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md">{path}</p>
    </Link>
  );
};

export default Path;
