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
import { UserSettingsMobileNav } from "@/components/users/settings/navigation/mobile-nav";
import { UserSettingsExit } from "@/components/users/settings/navigation/exit";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NotAuthorized } from "@/components/auth/not-authorized";
import { SignOutButton } from "@/components/auth/sign-out-button";

const ManageUserPage: NextPage = async () => {
  const currentUser = await getServerCurrentUser();
  const session = await getServerSession(authOptions);

  if (!currentUser || !currentUser.active) return redirect("/");

  if (session?.user && !currentUser)
    return (
      <div className="w-full h-screen grid place-items-center">
        <div className="w-full sm:w-[400px] mx-auto">
          <NotAuthorized />
        </div>
      </div>
    );

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
              <UserSettingsExit />
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
