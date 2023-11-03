import Image from "next/image";
import { Link } from "@/components/link";
import grass_block_old from "@/public/assets/grass_block_old.png";
import { FC } from "react";

interface NotFoundProps {
  message: string;
}

const PageNotFound: FC<NotFoundProps> = ({ message }) => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="grid place-items-center gap-2">
        <div className="w-40 h-40 float-animation">
          <Image src={grass_block_old} alt="logo" />
        </div>
        <p>{message}</p>
        <Link href="/">
          <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-max">Return home?</div>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
