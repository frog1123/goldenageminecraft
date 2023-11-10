import { SignInForm } from "@/components/auth/sign-in-form";
import type { NextPage } from "next";

const SignInPage: NextPage = async () => {
  return (
    <div className="w-[400px] mx-auto mt-20">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
