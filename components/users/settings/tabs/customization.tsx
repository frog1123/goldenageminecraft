"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/utils/cn";
import { FC } from "react";
import { EditProfilePicture } from "@/components/users/settings/edit-profile-picture";
import { Separator } from "@/components/separator";
import { EditUserBio } from "@/components/users/settings/edit-user-bio";

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
            <div className="grid grid-cols-[max-content_max-content_auto] gap-2 ">
              <div className="w-20 h-20">
                <EditProfilePicture />
              </div>
              <Separator orientation="vertical" />
              <p>This will be displayed as your user avatar.</p>
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
              <EditUserBio />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
