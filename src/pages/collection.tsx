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
      <h1 className="mb-12 flex flex-wrap gap-2 text-4xl font-medium">
        Twoja kolekcja <p className="text-rose-400">{data?.length}</p> ikon
      </h1>
      <span className="text-xl leading-tight text-rose-200">
        Uwaga: Najedź myszką na ikonkę, aby pobrać w najwyższej jakości
      </span>
      <div className="mt-10 grid grid-cols-2 flex-wrap justify-around gap-4 md:flex ">
        {data?.map((icon) => {
          return <IconList download icon={icon} key={icon.id} />;
        })}
      </div>
    </>
  );
};

export default Collection;
