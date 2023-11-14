"use client";

import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";
import { FC } from "react";

export const MyAccountTab: FC = () => {
  const userSettings = useUserSettings();

  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "my-account";

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>my account</p>
    </div>
  );
};
