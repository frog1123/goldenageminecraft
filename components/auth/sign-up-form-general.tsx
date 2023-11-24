"use client";

import { logo } from "@/lib/logo";
import { FC, useContext } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import google from "@/public/assets/google.png";
import { Mail } from "lucide-react";
import { Link } from "@/components/link";
import { Separator } from "@/components/separator";
import { Context } from "@/context";

export const SignUpFormGeneral: FC = () => {
  const context = useContext(Context);

  const handleGoogleRegister = async () => {
    const result = await signIn("google", { redirect: true, callbackUrl: "/sign-up/google" });
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md overflow-hidden">
      <div className="bg-emerald-500 h-1 hidden sm:block"></div>
      <div className="p-4">
        <div className="grid grid-cols-[max-content_auto] gap-1 mx-auto w-max place-items-center">
          <div className="w-5 h-5 relative">
            <Image src={logo()} alt="logo" fill />
          </div>
          <span className="uppercase text-xl font-bold text-zinc-500 dark:text-white">Register</span>
        </div>
        <div className="grid grid-flow-row gap-2 mt-4">
          <Link href="/sign-up/email">
            <button className="text-white bg-emerald-500 hover:bg-emerald-800 transition p-2 rounded-md w-full">
              <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>Sign up with email</span>
              </div>
            </button>
          </Link>
          <div className="grid grid-cols-[auto_max-content_auto] place-items-center gap-2">
            <Separator orientation="horizontal" />
            <span className="uppercase text-xs font-bold text-zinc-500 dark:text-white">or</span>
            <Separator orientation="horizontal" />
          </div>
          <button onClick={handleGoogleRegister} className="text-black bg-white hover:bg-gray-300 transition p-2 rounded-md w-full">
            <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
              <div className="w-4 h-4 relative">
                <Image src={google} fill alt="google" />
              </div>
              <span>Sign up with google</span>
            </div>
          </button>
          <p className="uppercase text-xs font-bold text-zinc-500 dark:text-white text-center">
            Have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:text-blue-600 transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
