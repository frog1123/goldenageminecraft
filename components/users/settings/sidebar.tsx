"use client";

import { Seperator } from "@/components/separator";
import { UserSettingsType, useUserSettings } from "@/hooks/use-user-settings-store";
import { FC } from "react";

const userSettingsItems: Array<{ name: string; tab: UserSettingsType }> = [
  { name: "My Account", tab: "my-account" },
  { name: "Customization", tab: "customization" },
  { name: "Appearance", tab: "appearance" },
  { name: "Accessibility", tab: "accessibility" }
];

export const UserSettingsSidebar: FC = () => {
  const userSettings = useUserSettings();

  return (
    <div className="grid-flow-row grid gap-1 py-2 px-4">
      <div>
        <p className="uppercase text-xs font-bold text-zinc-500 px-1">User settings</p>
      </div>
      {userSettingsItems.map(setting => (
        <button
          onClick={() => userSettings.onOpen(setting.tab)}
          key={setting.tab}
          className="text-left hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-full cursor-pointer"
        >
          <span>{setting.name}</span>
        </button>
      ))}
      <div className="px-1">
        <Seperator orientation="horizontal" />
      </div>
      <div className="hover:bg-neutral-300 dark:hover:bg-neutral-800 p-1 transition rounded-md w-full cursor-pointer">Log out</div>
    </div>
  );
};
