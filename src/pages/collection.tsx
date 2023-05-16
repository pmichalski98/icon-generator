import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const Collection = () => {
  const { data, isLoading, error } = api.icons.getIcons.useQuery();

  return (
    <div>
      {data?.map((icon) => {
        return (
          <li key={icon.id}>
            <Image
              width={200}
              height={200}
              alt={"generated icon"}
              src={`https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`}
            />
          </li>
        );
      })}
    </div>
  );
};

export default Collection;
