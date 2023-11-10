import { SignUpForm } from "@/components/auth/sign-up-form";
import { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <div className="w-[400px] mx-auto mt-20">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
