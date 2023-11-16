"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";
import { FC } from "react";

export const CustomizationTab: FC = () => {
  const userSettings = useUserSettings();

  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "customization";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>customization</p>
      <p>coming soon!</p>
    </div>
  );
};
