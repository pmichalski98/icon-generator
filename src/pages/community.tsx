import React from "react";
import { api } from "~/utils/api";
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
      <h1 className="mb-12 text-5xl font-medium leading-tight ">
        Ostatnio wygenerowane ikonki przez naszych użytkowników
      </h1>
      <div className="grid grid-cols-2 flex-wrap justify-around justify-items-center gap-4 md:flex ">
        {data?.map((icon) => {
          return <IconList key={icon.id} icon={icon} />;
        })}
      </div>
    </>
  );
};

export default Community;
