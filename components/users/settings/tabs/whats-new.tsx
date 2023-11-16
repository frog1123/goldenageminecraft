"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";
import { FC } from "react";

export const WhatsNewTab: FC = () => {
  const userSettings = useUserSettings();

  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "whats-new";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>whats new</p>
      <p>coming soon!</p>
    </div>
  );
};
