import { SignOutButton } from "@/components/auth/sign-out-button";
import { FC } from "react";

export const SignOutForm: FC = () => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md overflow-hidden">
      <div className="bg-emerald-500 h-1 hidden sm:block"></div>
      <div className="p-4">
        <p className="text-center">Are you sure want to sign out?</p>
        <div className="w-full grid place-items-center mt-2">
          <SignOutButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
