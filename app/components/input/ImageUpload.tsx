"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: unknown) => {
      let secureUrl = "";

      if (
        typeof result === "object" &&
        result !== null &&
        "info" in result
      ) {
        const info = (result as { info?: unknown }).info;

        if (typeof info === "string") {
          secureUrl = info;
        } else if (
          typeof info === "object" &&
          info !== null &&
          "secure_url" in info &&
          typeof (info as { secure_url?: unknown }).secure_url === "string"
        ) {
          secureUrl = (info as { secure_url: string }).secure_url;
        }
      }

      if (secureUrl) {
        onChange(secureUrl);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="staho_app"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="
            relative cursor-pointer hover:opacity-70 
            transition border-dashed border-2 p-20 
            border-neutral-300 flex flex-col 
            justify-center items-center gap-4 
            text-neutral-600
          "
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="Uploaded image"
                fill
                style={{ objectFit: "cover" }}
                src={value}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}

export default ImageUpload;
