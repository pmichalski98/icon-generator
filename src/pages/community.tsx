import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const Community = () => {
  const { data, isLoading, error } = api.icons.getCommunityIcons.useQuery();

  return (
    <div>
      {data?.map((icon) => {
        return (
          <li key={icon.id}>
            <Image
              className="mb-4 rounded-lg"
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

export default Community;
