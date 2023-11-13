import { Link } from "@/components/link";
import { AccessibilityTab } from "@/components/users/settings/accessibility";
import { AppearanceTab } from "@/components/users/settings/appearance";
import { CustomizationTab } from "@/components/users/settings/customization";
import { MyAccountTab } from "@/components/users/settings/my-account";
import { UserSettingsSidebar } from "@/components/users/settings/sidebar";
import { X } from "lucide-react";

import { NextPage } from "next";

const ManageUserPage: NextPage = () => {
  return (
    <div className="w-max mx-auto">
      <div className="grid grid-flow-col sm:grid-cols-[max-content_60vw_max-content] lg:grid-cols-[max-content_50vw_max-content] xl:grid-cols-[max-content_40vw_max-content] ">
        <UserSettingsSidebar />
        <div className="bg-red-400 w-full">
          <MyAccountTab />
          <CustomizationTab />
          <AppearanceTab />
          <AccessibilityTab />
        </div>
        <div className="bg-indigo-500 w-full pl-2">
          <Link href="/">
            <button className="rounded-[50%] p-1 border-zinc-500 dark:border-white border-2">
              <X className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;
