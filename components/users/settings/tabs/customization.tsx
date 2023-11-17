"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { EditProfilePicture } from "@/components/users/settings/edit-profile-picture";

export const CustomizationTab: FC = () => {
  const userSettings = useUserSettings();
  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "customization";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <div className="sm:p-4">
        <p className="font-semibold text-2xl py-1">Customization</p>
        <div className="grid grid-flow-row gap-2">
          <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 grid grid-flow-row gap-2">
            <p className="uppercase text-xs font-bold text-zinc-500">Edit profile picture</p>
            <div className="w-20 h-20">
              <EditProfilePicture />
            </div>
          </div>
          <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 grid grid-flow-row gap-2">
            <p className="uppercase text-xs font-bold text-zinc-500">Edit banner image</p>
            <div>
              <p>coming soon!</p>
            </div>
          </div>
          <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 grid grid-flow-row gap-2">
            <p className="uppercase text-xs font-bold text-zinc-500">Edit user bio</p>
            <div>
              <p>coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
