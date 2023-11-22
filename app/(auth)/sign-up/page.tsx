import { SignUpForm } from "@/components/auth/sign-up-form";
import { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
