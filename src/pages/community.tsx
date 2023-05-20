import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import IconList from "~/components/IconList";

const Community = () => {
  const { data, isLoading, error } = api.icons.getCommunityIcons.useQuery();

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
