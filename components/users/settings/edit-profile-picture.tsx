"use client";

import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { Context } from "@/context";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { CurrentUserType } from "@/types/users";
import { cn } from "@/utils/cn";
import axios from "axios";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { FC, useCallback, useContext, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

export const EditProfilePicture: FC = () => {
  const { edgestore } = useEdgeStore();
  const context = useContext(Context);
  // const [imageUrl, setImageUrl] = useState<string | null>(context.value.currentUser?.imageUrl ? context.value.currentUser?.imageUrl : null);
  const [isHovered, setIsHovered] = useState(false);

  const handleProfilePictureUpload = useCallback(
    async (file: File) => {
      const res = await edgestore.publicImages.upload({
        file,
        input: { type: "avatar" }
      });

      if (!context.value.currentUser) return;

      if (context.value.currentUser.imageUrl) {
        try {
          await edgestore.publicImages.delete({
            url: context.value.currentUser.imageUrl
          });
        } catch (err) {
          console.error("[EDGESTORE_DELETE]", err);
        }
      }

      await axios.patch("/api/users/avatar", { imageUrl: res.url });

      return { url: res.url };
    },
    [edgestore.publicImages, context.value.currentUser?.id]
  );

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      // get first file
      if (!context.value.currentUser) return;
      const [firstFile] = acceptedFiles;
      if (firstFile) {
        const i = await handleProfilePictureUpload(firstFile);

        context.setValue({ ...context.value, currentUser: { ...(context.value.currentUser as CurrentUserType), imageUrl: i!.url } });
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
      className="border-2 border-dashed border-zinc-500 text-center cursor-pointer w-full h-full overflow-hidden rounded-[50%]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <div className={cn("absolute grid place-items-center w-full h-full transition z-20", isHovered && "bg-black/50")}>{isHovered && <Pencil />}</div>
        {context.value.currentUser?.imageUrl ? (
          <Image src={context.value.currentUser?.imageUrl} alt="Edit avatar" fill />
        ) : (
          <Image src={defaultUserProfilePicture()} alt="Edit avatar" fill />
        )}
        <input {...getInputProps()} />
      </div>
    </div>
  );
};
