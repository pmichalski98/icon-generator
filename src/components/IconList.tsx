import React, { useState } from "react";
import Image from "next/image";
import { type Icon } from ".prisma/client";

const IconList = ({ icon }: { icon: Icon }) => {
  const [hover, setHover] = useState(false);
  return (
    <li key={icon.id}>
      <div
        onMouseLeave={() => setHover(false)}
        onMouseOver={() => setHover(true)}
        className="flex justify-center"
      >
        <p
          className={`absolute -translate-y-10 rounded-lg bg-neutral-400/20 px-2 py-1 transition
            ${hover ? "" : "hidden"}`}
        >
          {icon.prompt}
        </p>
        <Image
          className="rounded-3xl transition hover:opacity-60"
          width="180"
          height="208"
          alt={"generated icon"}
          src={`https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`}
        />
      </div>
    </li>
  );
};

export default IconList;
