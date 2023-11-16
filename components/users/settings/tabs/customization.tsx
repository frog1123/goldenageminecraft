"use client";

import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";

export const CustomizationTab: FC = () => {
  const userSettings = useUserSettings();
  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "customization";

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>customization</p>
      <p>coming soon!</p>

      <div>
        <input
          type="file"
          onChange={e => {
            setFile(e.target.files?.[0]);
          }}
        />
        <button
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: progress => {
                  // you can use this to show a progress bar
                  console.log(progress);
                }
              });
              // you can run some server action or api here
              // to add the necessary data to your database
              console.log(res);
            }
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
