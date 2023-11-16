"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";
import { FC } from "react";

export const PremiumTab: FC = () => {
  const userSettings = useUserSettings();

  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "premium";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>premium</p>
      <p>coming soon!</p>
    </div>
  );
};
