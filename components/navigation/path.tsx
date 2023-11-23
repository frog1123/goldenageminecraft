import { Link } from "@/components/link";
import { FC } from "react";

interface PathProps {
  path: string;
  route: string;
}

const Path: FC<PathProps> = ({ path, route }) => {
  return (
    <Link href={route}>
      <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md">
        {/* truncate doesnt work with <span> */}
        <p className="whitespace-nowrap overflow-hidden truncate max-w-[150px] md:max-w-none">{path}</p>
      </div>
    </Link>
  );
};

export default Path;
