"use client";

import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface ImageDropzoneProps {
  onImageUpload: (file: File) => Promise<{ url: string }> | { url: string };
  circle?: boolean;
}

export const ImageDropzone: FC<ImageDropzoneProps> = ({ onImageUpload, circle }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      // get first file
      const [firstFile] = acceptedFiles;
      if (firstFile) {
        const i = await onImageUpload(firstFile);

        setImageUrl(i.url);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpg": [".jpg"], "image/jpeg": [".jpeg"] },
    onDrop,
    maxFiles: 1
  });

  return (
    <div {...getRootProps()} className={cn("border-2 border-dashed border-zinc-500 text-center cursor-pointer w-full h-full overflow-hidden", circle && "rounded-[50%]")}>
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
