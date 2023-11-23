"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/utils/cn";
import { FC } from "react";

export const AppearanceTab: FC = () => {
  const userSettings = useUserSettings();

  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "appearance";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>appearance</p>
      <p>coming soon!</p>
    </div>
  );
};
