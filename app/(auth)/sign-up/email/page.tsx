import { SignUpEmailForm } from "@/components/auth/sign-up-form-email";
import { NextPage } from "next";

const SignUpEmailPage: NextPage = () => {
  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <SignUpEmailForm />
    </div>
  );
};

export default SignUpEmailPage;
