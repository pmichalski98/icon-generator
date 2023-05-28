import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import IconList from "~/components/IconList";
import { ClipLoader } from "react-spinners";

const Community = () => {
  const { data, isLoading, error } = api.icons.getCommunityIcons.useQuery();

  if (isLoading && !data)
    return (
      <div className="flex items-center justify-center">
        <ClipLoader size={150} color={"red"} className="opacity-60" />
      </div>
    );
  if (error) return <div>Błąd przy ładowaniu zawartości...</div>;
  return (
    <>
      <h1 className="mb-12 text-4xl font-medium">
        Ikony wygenerowane przez społeczność
      </h1>
      <div className="flex flex-wrap justify-around gap-4 ">
        {data?.map((icon) => {
          return <IconList key={icon.id} icon={icon} />;
        })}
      </div>
    </>
  );
};

export default Community;
