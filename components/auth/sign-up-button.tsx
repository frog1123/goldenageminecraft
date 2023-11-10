import { Antenna } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const SignUpButton: FC = () => {
  return (
    <Link href="/sign-up">
      <button className="bg-emerald-500 rounded-md px-2 hover:bg-emerald-800 transition h-[32px] text-white">
        <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
          <Antenna className="w-4 h-4" />
          <span>Sign up</span>
        </div>
      </button>
    </Link>
  );
};
