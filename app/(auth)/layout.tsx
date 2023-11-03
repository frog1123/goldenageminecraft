import { NextPage } from "next";

const AuthLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="w-full h-screen grid place-items-center">{children}</div>;
};

export default AuthLayout;
