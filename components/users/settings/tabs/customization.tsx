"use client";

import { ImageDropzone } from "@/components/image-dropzone";
import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { useUserSettings } from "@/hooks/use-user-settings-store";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";

export const CustomizationTab: FC = () => {
  const userSettings = useUserSettings();
  const isUserSettingsOpen = userSettings.isOpen && userSettings.type === "customization";

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const handleProfilePictureUpload = async (file: File) => {
    console.log(file);

    const res = await edgestore.publicFiles.upload({
      file
    });

    console.log(res);

    return { url: res.url };
  };

  return (
    <div className={cn("", isUserSettingsOpen ? "block" : "hidden")}>
      <p>customization</p>
      <p>coming soon!</p>

      <div>
        <p>test</p>
        <div className="w-20 h-20">
          <ImageDropzone onImageUpload={handleProfilePictureUpload} circle />
        </div>
      </div>
    </div>
  );
};
