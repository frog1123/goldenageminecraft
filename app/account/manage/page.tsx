import { AccessibilityTab } from "@/components/users/settings/accessibility";
import { AppearanceTab } from "@/components/users/settings/appearance";
import { CustomizationTab } from "@/components/users/settings/customization";
import { MyAccountTab } from "@/components/users/settings/my-account";
import { UserSettingsSidebar } from "@/components/users/settings/sidebar";

import { NextPage } from "next";

const ManageUserPage: NextPage = () => {
  return (
    <div className="w-max mx-auto">
      <div className="grid grid-flow-col sm:grid-cols-[max-content_60vw] lg:grid-cols-[max-content_50vw] xl:grid-cols-[max-content_40vw] ">
        <UserSettingsSidebar />
        <div className="bg-red-400 w-full">
          <MyAccountTab />
          <CustomizationTab />
          <AppearanceTab />
          <AccessibilityTab />
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;
