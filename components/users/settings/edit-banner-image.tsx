"use client";

import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { Context } from "@/context";
import { defaultBannerColor } from "@/lib/default-banner-color";
import { cn } from "@/utils/cn";
import axios from "axios";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { FC, useCallback, useContext, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

export const EditBannerImage: FC = () => {
  const { edgestore } = useEdgeStore();
  const context = useContext(Context);
  const [imageUrl, setImageUrl] = useState<string | null>(context.value.currentUser?.imageUrl ? context.value.currentUser?.imageUrl : null);
  const [isHovered, setIsHovered] = useState(false);

  const handleProfilePictureUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file
    });

    await axios.patch("/api/users/banner", {
      id: context.value.currentUser?.id,
      bannerUrl: res.url
    });

    return { url: res.url };
  };

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      // get first file
      const [firstFile] = acceptedFiles;
      if (firstFile) {
        const i = await handleProfilePictureUpload(firstFile);

        setImageUrl(i.url);
      }
    },
    [handleProfilePictureUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpg": [".jpg"], "image/jpeg": [".jpeg"] },
    onDrop,
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-zinc-500 text-center cursor-pointer w-full h-full overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <div className={cn("absolute grid place-items-center w-full h-full transition z-20", isHovered && "bg-black/50")}>{isHovered && <Pencil />}</div>
        {imageUrl ? (
          <Image src={imageUrl} alt="Edit avatar" fill />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: defaultBannerColor(context.value.currentUser!.id) }}></div>
        )}
        <input {...getInputProps()} />
      </div>
    </div>
  );
};
