import { NotAuthorized } from "@/components/auth/not-authorized";
import type { NextPage } from "next";

const AuthErrorPage: NextPage = async () => {
  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <NotAuthorized />
    </div>
  );
};

export default AuthErrorPage;
