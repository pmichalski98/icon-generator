import React, { useState } from "react";
import Image from "next/image";
import { type Icon } from ".prisma/client";
import { api } from "~/utils/api";
import fileDownload from "js-file-download";
import { HiDownload } from "react-icons/hi";
import { ClipLoader } from "react-spinners";

interface IconProps {
  icon: Icon;
  hover?: boolean;
  download?: boolean;
}
const IconList = ({ icon, hover, download }: IconProps) => {
  const [state, setState] = useState(false);
  const { mutate: downloadImg, isLoading } = api.icons.downloadIcon.useMutation(
    {
      onSuccess: (data) => {
        fileDownload(data as ArrayBuffer, "wygenerowana_ikonka.png");
      },
    }
  );
  return (
    <li
      key={icon.id}
      className="flex w-fit justify-end "
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
    >
      <Image
        title={hover !== false ? icon.prompt! : ""}
        className={` mx-auto  rounded-3xl transition ${
          state ? "hover:opacity-60" : ""
        }`}
        width="180"
        height="208"
        alt={"generated icon"}
        src={`https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`}
      />
      {state && download && (
        <button
          className={`absolute p-2`}
          onClick={() => downloadImg({ iconId: icon.id })}
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color={"white"} size={40} />
          ) : (
            <HiDownload
              className="rounded border-2 border-slate-400 opacity-90 hover:opacity-70"
              size={40}
            />
          )}
        </button>
      )}
    </li>
  );
};

export default IconList;
