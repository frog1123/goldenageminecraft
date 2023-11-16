import { FC } from "react";
import { UserSettingsItem } from "@/components/users/settings/navigation/sidebar";
import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";

interface UserSettingsSidebarProps {
  item: UserSettingsItem;
}

export const UserSettingsSidebarItem: FC<UserSettingsSidebarProps> = ({ item }) => {
  const userSettings = useUserSettings();

  if (userSettings.isOpen && userSettings.type === item.tab)
    return (
      <button
        key={`setting-${item.tab}`}
        className={cn("text-left px-2 py-1 !pr-6 transition rounded-md w-full cursor-default", item?.bgColor ? item.bgColor : "bg-neutral-300 dark:bg-neutral-800")}
      >
        <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
          {item.icon}
          <span className="w-max mr-auto">{item.name}</span>
        </div>
      </button>
    );
  else
    return (
      <button
        onClick={() => userSettings.onOpen(item.tab)}
        key={`setting-${item.tab}`}
        className="text-left hover:bg-neutral-300 dark:hover:bg-neutral-800 px-2 py-1 !pr-6 transition rounded-md w-full cursor-pointer"
      >
        <div className={cn("grid grid-cols-[max-content_auto] place-items-center gap-1", item?.color && item.color)}>
          {item.icon}
          <span className="w-max mr-auto">{item.name}</span>
        </div>
      </button>
    );
};
