"use client";

import { FC } from "react";
import { UserSettingsNavContent } from "@/components/users/settings/navigation/nav-content";

export const UserSettingsSidebar: FC = () => {
  return (
    <div className="grid-flow-row grid gap-1 py-2 px-4 !pt-6 h-max">
      <UserSettingsNavContent />
    </div>
  );
};
