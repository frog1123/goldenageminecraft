import { SignOutForm } from "@/components/auth/sign-out-form";
import type { NextPage } from "next";

const SignOutPage: NextPage = async () => {
  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <SignOutForm />
    </div>
  );
};

export default SignOutPage;
