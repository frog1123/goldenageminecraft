"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/utils/cn";
import { FC, useContext } from "react";
import { EditProfilePicture } from "@/components/users/settings/edit-profile-picture";
import { Separator } from "@/components/separator";
import { EditUserBio } from "@/components/users/settings/edit-user-bio";
import { EditBannerImage } from "@/components/users/settings/edit-banner-image";
import { Lightbulb, Trash2 } from "lucide-react";
import axios from "axios";
import { Context } from "@/context";
import { CurrentUserType } from "@/types/users";
import { useEdgeStore } from "@/components/providers/edgestore-provider";

export const CustomizationTab: FC = () => {
  const userSettings = useUserSettings();
  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "customization";
  const context = useContext(Context);
  const { edgestore } = useEdgeStore();

  const handleProfilePictureReset = async () => {
    if (!context.value.currentUser) return;

    if (context.value.currentUser.imageUrl) {
      await edgestore.publicImages.delete({
        url: context.value.currentUser.imageUrl
      });
    }

    context.setValue({ ...context.value, currentUser: { ...(context.value.currentUser as CurrentUserType), imageUrl: null } });
  };

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
              <div className="grid grid-flow-row gap-1 h-full">
                <div className="grid grid-cols-[max-content_auto] gap-1 place-items-center w-max">
                  <Lightbulb className="w-4 h-4" />
                  <span>This will be displayed as your user avatar.</span>
                </div>
                <div>
                  <button onClick={handleProfilePictureReset} className="bg-indigo-500 rounded-md px-2 hover:bg-indigo-800 transition h-[32px] text-white">
                    <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
                      <Trash2 className="w-4 h-4" />
                      <span>Reset</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 grid grid-flow-row gap-2">
            <p className="uppercase text-xs font-bold text-zinc-500">Edit banner image</p>
            <div className="w-full h-28">
              <EditBannerImage />
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
