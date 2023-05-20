import React from "react";
import Image from "next/image";
import { type Icon } from ".prisma/client";

const IconList = ({ icon }: { icon: Icon }) => {
  return (
    <li key={icon.id}>
      <Image
        className="mb-4 rounded-lg"
        width="256"
        height="256"
        alt={"generated icon"}
        src={`https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`}
      />
    </li>
  );
};

export default IconList;
