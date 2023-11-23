"use client";

import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { Separator } from "@/components/separator";
import { Context } from "@/context";
import { defaultUserProfilePicture } from "@/lib/default-profile-picture";
import { cn } from "@/utils/cn";
import axios from "axios";
import { Lightbulb, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { FC, useCallback, useContext, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

export const EditProfilePicture: FC = () => {
  const { edgestore } = useEdgeStore();
  const context = useContext(Context);
  const [imageUrl, setImageUrl] = useState<string | null>(context.value.currentUser?.imageUrl ? context.value.currentUser?.imageUrl : null);
  const [isHovered, setIsHovered] = useState(false);

  const handleProfilePictureUpload = useCallback(
    async (file: File) => {
      const res = await edgestore.publicFiles.upload({
        file
      });

      await axios.patch("/api/users/avatar");

      return { url: res.url };
    },
    [edgestore.publicFiles, context.value.currentUser?.id]
  );

  const handleProfilEPictureReset = async () => {
    await axios.delete("/api/users/avatar");
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
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2 grid grid-flow-row gap-2">
      <p className="uppercase text-xs font-bold text-zinc-500">Edit profile picture</p>
      <div className="grid grid-cols-[max-content_max-content_auto] gap-2 ">
        <div className="w-20 h-20">
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-zinc-500 text-center cursor-pointer w-full h-full overflow-hidden rounded-[50%]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full">
              <div className={cn("absolute grid place-items-center w-full h-full transition z-20", isHovered && "bg-black/50")}>{isHovered && <Pencil />}</div>
              {imageUrl ? <Image src={imageUrl} alt="Edit avatar" fill /> : <Image src={defaultUserProfilePicture()} alt="Edit avatar" fill />}
              <input {...getInputProps()} />
            </div>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="grid grid-flow-row gap-1 h-full">
          <div className="grid grid-cols-[max-content_auto] gap-1 place-items-center w-max">
            <Lightbulb className="w-4 h-4" />
            <span>This will be displayed as your user avatar.</span>
          </div>
          <div>
            <button onClick={handleProfilEPictureReset} className="bg-indigo-500 rounded-md px-2 hover:bg-indigo-800 transition h-[32px] text-white">
              <div className="grid grid-cols-[max-content_auto] place-items-center gap-1">
                <Trash2 className="w-4 h-4" />
                <span>Reset</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
