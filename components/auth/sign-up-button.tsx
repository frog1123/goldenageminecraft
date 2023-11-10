import Link from "next/link";
import { FC } from "react";

export const SignUpButton: FC = () => {
  return (
    <Link href="/sign-up">
      <button className="bg-indigo-500 rounded-md px-2 hover:bg-indigo-800 transition h-[32px]">sign up</button>
    </Link>
  );
};
