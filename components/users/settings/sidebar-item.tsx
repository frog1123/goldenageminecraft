import { FC } from "react";
import { UserSettingsItem } from "@/components/users/settings/sidebar";
import { useUserSettings } from "@/hooks/use-user-settings-store";

interface UserSettingsSidebarProps {
  item: UserSettingsItem;
}

export const UserSettingsSidebarItem: FC<UserSettingsSidebarProps> = ({ item }) => {
  const userSettings = useUserSettings();

  if (userSettings.isOpen && userSettings.type === item.tab)
    return (
      <button key={`setting-${item.tab}`} className="text-left bg-neutral-300 dark:bg-neutral-800 p-2 transition rounded-md w-full cursor-default">
        <div className="grid grid-cols-[max-content_auto] place-items-center">
          {item.icon}
          <span>{item.name}</span>
        </div>
      </button>
    );
  else
    return (
      <button
        onClick={() => userSettings.onOpen(item.tab)}
        key={`setting-${item.tab}`}
        className="text-left hover:bg-neutral-300 dark:hover:bg-neutral-800 p-2 transition rounded-md w-full cursor-pointer"
      >
        <div className="grid grid-cols-[max-content_auto] place-items-center">
          {item.icon}
          <span>{item.name}</span>
        </div>
      </button>
    );
};
