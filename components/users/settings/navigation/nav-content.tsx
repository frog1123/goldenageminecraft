import { Separator } from "@/components/separator";
import { Context } from "@/context";
import { UserSettingsType } from "@/hooks/use-user-settings-store";
import { Album, AlertTriangle, BellRing, Crown, LogOut, Paintbrush, ScanSearch, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useContext } from "react";
import { UserSettingsSidebarItem } from "@/components/users/settings/navigation/sidebar-item";

export type UserSettingsItem = { name: string; tab: UserSettingsType; color?: string; bgColor?: string; icon: React.ReactNode };

const userSettingsItems: UserSettingsItem[] = [
  { name: "My Account", tab: "my-account", icon: <User className="w-4 h-4" /> },
  { name: "Customization", tab: "customization", icon: <Paintbrush className="w-4 h-4" /> },
  { name: "Appearance", tab: "appearance", icon: <Album className="w-4 h-4" /> },
  { name: "Accessibility", tab: "accessibility", icon: <ScanSearch className="w-4 h-4" /> }
];

const specialItems: UserSettingsItem[] = [
  { name: "What's new", tab: "whats-new", icon: <BellRing className="w-4 h-4" /> },
  { name: "Premium", tab: "premium", icon: <Crown className="w-4 h-4" />, color: "text-pink-500", bgColor: "bg-pink-500" }
];

const dangerItems: UserSettingsItem[] = [{ name: "Danger", tab: "danger", icon: <AlertTriangle className="w-4 h-4" />, color: "text-rose-500", bgColor: "bg-rose-500" }];

export const UserSettingsNavContent: FC = () => {
  const router = useRouter();
  const context = useContext(Context);

  const handleSignOut = async () => {
    await signOut();

    router.push("/");

    context.setValue({
      ...context.value,
      currentUser: null
    });
  };

  return (
    <>
      <div>
        <p className="uppercase text-xs font-bold text-zinc-500 px-1">User settings</p>
      </div>
      {userSettingsItems.map(item => (
        <UserSettingsSidebarItem item={item} />
      ))}
      <div className="px-1">
        <Separator orientation="horizontal" />
      </div>
      {specialItems.map(item => (
        <UserSettingsSidebarItem item={item} />
      ))}
      <div className="px-1">
        <Separator orientation="horizontal" />
      </div>
      <div>
        <p className="uppercase text-xs font-bold text-rose-500/70 px-1">Danger</p>
      </div>
      {dangerItems.map(item => (
        <UserSettingsSidebarItem item={item} />
      ))}
      <div className="px-1">
        <Separator orientation="horizontal" />
      </div>
      <button onClick={handleSignOut} className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-2 transition rounded-md w-full cursor-pointer">
        <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
          <LogOut className="w-4 h-4" />
          <span className="w-max mr-auto">Log out</span>
        </div>
      </button>
    </>
  );
};
