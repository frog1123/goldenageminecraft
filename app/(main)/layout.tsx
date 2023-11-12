import Navbar from "@/components/navigation/navbar";
import { Subnav } from "@/components/navigation/subnav";
import { NextPage } from "next";

const MainLayout: NextPage<{ children: React.ReactNode }> = async ({ children }) => {
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
