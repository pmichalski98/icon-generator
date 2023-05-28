import React from "react";
import Image from "next/image";
import { type Icon } from ".prisma/client";

interface IconProps {
  icon: Icon;
  hover?: boolean;
}
const IconList = ({ icon, hover }: IconProps) => {
  if (icon.prompt === null) return <div>Something went wrong...</div>;
  return (
    <li key={icon.id}>
      <Image
        title={hover !== false ? icon.prompt : ""}
        className={`mx-auto rounded-3xl transition ${
          hover !== false ? "hover:opacity-60" : ""
        }`}
        width="180"
        height="208"
        alt={"generated icon"}
        src={`https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`}
      />
    </li>
  );
};

export default IconList;
