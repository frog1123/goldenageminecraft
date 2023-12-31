"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/utils/cn";
import { FC } from "react";

export const AccessibilityTab: FC = () => {
  const userSettings = useUserSettings();

  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "accessibility";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>accessibility</p>
      <p>coming soon!</p>
    </div>
  );
};
