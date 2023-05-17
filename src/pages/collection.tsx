import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const Collection = () => {
  const { data, isLoading, error } = api.icons.getIcons.useQuery();

  return (
    <>
      <h1 className="mb-12 text-4xl font-medium ">Twoje ikony</h1>
      <div className="flex flex-wrap gap-6">
        {data?.map((icon) => {
          return (
            <li key={icon.id}>
              <Image
                className=" rounded-lg"
                width={200}
                height={200}
                alt={"generated icon"}
                src={`https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`}
              />
            </li>
          );
        })}
      </div>
    </>
  );
};

export default Collection;