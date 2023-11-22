import { SignInForm } from "@/components/auth/sign-in-form";
import type { NextPage } from "next";

const SignInPage: NextPage = async () => {
  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
