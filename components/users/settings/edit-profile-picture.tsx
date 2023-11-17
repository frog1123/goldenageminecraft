"use client";

import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { Context } from "@/context";
import axios from "axios";
import { Pencil } from "lucide-react";
import { FC, useCallback, useContext, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

export const EditProfilePicture: FC = () => {
  const { edgestore } = useEdgeStore();
  const context = useContext(Context);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleProfilePictureUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file
    });

    await axios.patch("/api/users/avatar", {
      id: context.value.currentUser?.id,
      imageUrl: res.url
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
    <div {...getRootProps()} className="border-2 border-dashed border-zinc-500 text-center cursor-pointer w-full h-full overflow-hidden rounded-[50%]">
      <div className="relative w-full h-full">
        <div className="absolute grid place-items-center w-full h-full">
          <Pencil />
        </div>
        {imageUrl && <img src={imageUrl} alt="Uploaded" className="w-full h-full" />}
        <input {...getInputProps()} />
      </div>
    </div>
  );
};
