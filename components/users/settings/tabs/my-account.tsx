"use client";

import { Context } from "@/context";
import { useUserSettings } from "@/hooks/use-user-settings-store";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { cn } from "@/lib/utils";
import { FC, useContext } from "react";
import Image from "next/image";
import { Separator } from "@/components/separator";
import { Crown, Gavel, Sailboat, Shield } from "lucide-react";
import { UserRank, UserRole, UserPlan } from "@prisma/client";

import coal from "@/public/assets/ranks/coal.png";
import iron from "@/public/assets/ranks/iron.png";
import gold from "@/public/assets/ranks/gold.png";
import redstone from "@/public/assets/ranks/redstone.png";
import lapis from "@/public/assets/ranks/lapis.png";
import diamond from "@/public/assets/ranks/diamond.png";

const rankMap = {
  [UserRank.COAL]: <Image src={coal} alt="rank" fill />,
  [UserRank.IRON]: <Image src={iron} alt="rank" fill />,
  [UserRank.GOLD]: <Image src={gold} alt="rank" fill />,
  [UserRank.REDSTONE]: <Image src={redstone} alt="rank" fill />,
  [UserRank.LAPIS]: <Image src={lapis} alt="rank" fill />,
  [UserRank.DIAMOND]: <Image src={diamond} alt="rank" fill />
};

const roleMap = {
  [UserRole.USER]: null,
  [UserRole.MODERATOR]: <Shield className="w-5 h-5 text-blue-500" />,
  [UserRole.ADMIN]: <Gavel className="w-5 h-5 text-rose-500" />,
  [UserRole.OWNER]: <Sailboat className="w-5 h-5 text-indigo-700" />
};

export const MyAccountTab: FC = () => {
  const userSettings = useUserSettings();
  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "my-account";
  const context = useContext(Context);

  if (!context.value.currentUser)
    return (
      <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
        <p>my account</p>
        <p>something went wrong</p>
      </div>
    );

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <div className="p-4">
        <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
          <div className="grid grid-cols-[max-content_max-content_auto] gap-2">
            <div className="relative w-20 h-20 rounded-[50%] overflow-hidden">
              {context.value.currentUser.imageUrl ? (
                <Image src={context.value.currentUser.imageUrl} alt="pfp" fill />
              ) : (
                <Image src={defaultUserProfilePicture()} alt="pfp" fill />
              )}
            </div>
            <Separator orientation="vertical" />
            <div className="grid grid-flow-row h-full w-max">
              <p className="font-semibold">{context.value.currentUser.name}</p>
              <div>
                <div className="grid grid-flow-col place-items-center bg-neutral-300 dark:bg-neutral-800 p-1 rounded-md">
                  {context.value.currentUser.plan === UserPlan.PREMIUM && <Crown className="w-5 h-5 text-pink-500 mr-1" />}
                  {roleMap[context.value.currentUser.role]}
                  <div className="relative w-6 h-6">{rankMap[context.value.currentUser.rank]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
