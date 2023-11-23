import { SignUpFormGoogle } from "@/components/auth/sign-up-form-google";
import { NextPage } from "next";

const SignUpGooglePage: NextPage = () => {
  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <SignUpFormGoogle />
    </div>
  );
};

export default SignUpGooglePage;
