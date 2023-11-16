import { Link } from "@/components/link";
import { AccessibilityTab } from "@/components/users/settings/tabs/accessibility";
import { AppearanceTab } from "@/components/users/settings/tabs/appearance";
import { CustomizationTab } from "@/components/users/settings/tabs/customization";
import { MyAccountTab } from "@/components/users/settings/tabs/my-account";
import { UserSettingsSidebar } from "@/components/users/settings/navigation/sidebar";
import { getServerCurrentUser } from "@/lib/current-user";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { WhatsNewTab } from "@/components/users/settings/tabs/whats-new";
import { PremiumTab } from "@/components/users/settings/tabs/premium";
import { DangerTab } from "@/components/users/settings/tabs/danger";
import { X } from "lucide-react";
import { UserSettingsMobileNav } from "@/components/users/settings/navigation/mobile-nav";

const ManageUserPage: NextPage = async () => {
  const currentUser = await getServerCurrentUser();

  if (!currentUser || !currentUser.active) return redirect("/");

  return (
    <>
      <div className="hidden sm:block">
        <div className="w-max mx-auto">
          <div className="grid grid-flow-col sm:grid-cols-[max-content_60vw_max-content] lg:grid-cols-[max-content_50vw_max-content] xl:grid-cols-[max-content_40vw_max-content] ">
            <UserSettingsSidebar />
            <div className="w-full">
              <MyAccountTab />
              <CustomizationTab />
              <AppearanceTab />
              <AccessibilityTab />
              <WhatsNewTab />
              <PremiumTab />
              <DangerTab />
            </div>
            <div className="w-full pl-2">
              <Link href="/">
                <button className="transition rounded-[50%] border-zinc-500 text-zinc-500 dark:border-white dark:text-white border-2 hover:text-zinc-800 hover:border-zinc-800 dark:hover:text-zinc-700 dark:hover:border-zinc-700 p-1 mt-4">
                  <X className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <UserSettingsMobileNav />
        <div className="w-full pt-12">
          <MyAccountTab />
          <CustomizationTab />
          <AppearanceTab />
          <AccessibilityTab />
          <WhatsNewTab />
          <PremiumTab />
          <DangerTab />
        </div>
      </div>
    </>
  );
};

export default ManageUserPage;
