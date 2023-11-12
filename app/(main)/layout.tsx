import { SignOutButton } from "@/components/auth/sign-out-button";
import Navbar from "@/components/navigation/navbar";
import { Subnav } from "@/components/navigation/subnav";
import { getServerCurrentUser } from "@/lib/current-user";
import { NextPage } from "next";

const MainLayout: NextPage<{ children: React.ReactNode }> = async ({ children }) => {
  const currentUser = await getServerCurrentUser();

  if (currentUser && !currentUser.active)
    return (
      <div className="w-full h-screen grid place-items-center">
        <div className="w-max grid grid-flow-row gap-2 place-items-center">
          <p>Your account hasn&apos;t been activated</p>
          <SignOutButton afterSignOutUrl="/" text="Sign out and return home" />
        </div>
      </div>
    );

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="py-20">
        <div className="grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto">
          <Subnav />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
