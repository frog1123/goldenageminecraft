import Navbar from "@/components/navigation/navbar";
import { Subnav } from "@/components/navigation/subnav";
import { SignOutButton } from "@/components/sign-out-button";
import { getCurrentUser } from "@/lib/current-user";
import { auth } from "@clerk/nextjs";
import { NextPage } from "next";

const MainLayout: NextPage<{ children: React.ReactNode }> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  const { userId } = auth();

  if (userId && currentUser?.userId !== userId)
    return (
      <div className="w-full h-screen">
        <div className="grid place-items-center h-full">
          <div className="grid grid-flow-row place-items-center gap-2">
            <p className="w-max">Couldn&apos;t authenticate your connection</p>
            <p className="w-max">Try refreshing</p>
            <p>or</p>
            <SignOutButton text="Sign out and return home" afterSignOutUrl="/" />
          </div>
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
