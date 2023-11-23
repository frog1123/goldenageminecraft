import { SignUpFormGeneral } from "@/components/auth/sign-up-form-general";
import { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <SignUpFormGeneral />
    </div>
  );
};

export default SignUpPage;
