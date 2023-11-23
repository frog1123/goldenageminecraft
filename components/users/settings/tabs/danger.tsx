"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/utils/cn";
import { FC } from "react";

export const DangerTab: FC = () => {
  const userSettings = useUserSettings();

  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "danger";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>danger</p>
      <p>coming soon!</p>
    </div>
  );
};
