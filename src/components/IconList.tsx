import React from "react";
import Image from "next/image";
import { type Icon } from ".prisma/client";

const IconList = ({ icon }: { icon: Icon }) => {
  return (
    <li key={icon.id}>
      <Image
        className="rounded-3xl"
        width="180"
        height="208"
        alt={"generated icon"}
        src={`https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`}
      />
    </li>
  );
};

export default IconList;
