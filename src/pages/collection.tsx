import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import IconList from "~/components/IconList";

const Collection = () => {
  const { data, isLoading, error } = api.icons.getIcons.useQuery();

  if (!data) return <div>Something went wrong...</div>;
  return (
    <>
      <h1 className="mb-12 flex gap-2 text-4xl font-medium ">
        Twoja kolekcja <p className="text-rose-400">{data.length}</p> ikon
      </h1>
      <div className="flex flex-wrap justify-around gap-4 ">
        {data?.map((icon) => {
          return <IconList icon={icon} key={icon.id} />;
        })}
      </div>
    </>
  );
};

export default Collection;
