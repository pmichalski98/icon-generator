import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import IconList from "~/components/IconList";
import { ClipLoader } from "react-spinners";

const Collection = () => {
  const { data, isLoading, error } = api.icons.getIcons.useQuery();

  if (isLoading && !data)
    return (
      <div className="flex items-center justify-center">
        <ClipLoader size={150} color={"red"} className="opacity-60" />
      </div>
    );
  if (error) return <div>Błąd przy ładowaniu zawartości...</div>;
  return (
    <>
      <h1 className="mb-12 flex gap-2 text-4xl font-medium ">
        Twoja kolekcja <p className="text-rose-400">{data?.length}</p> ikon
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
