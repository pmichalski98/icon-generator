import { type NextPage } from "next";
import React from "react";
import Image from "next/image";
import MyLinkBtnStyle from "~/components/MyLinkBtnStyle";
import { api } from "~/utils/api";
import { AiOutlineArrowDown } from "react-icons/ai";

const Home: NextPage = () => {
  const { data, isLoading, error } = api.icons.getIconsCount.useQuery();
  return (
    <>
      <section className="container flex flex-col flex-wrap justify-around gap-4 md:flex-row">
        <div className="container mx-auto mb-20 max-w-[500px]">
          <h1 className="text-5xl font-medium leading-tight">
            Najszybszy generator ikonek AI
          </h1>
          <p className="mb-10 py-4 text-lg">
            Oszczędź czas i pieniądze, wygeneruj własne ikonki przy pomocy
            sztucznej inteligencji za złotówkę.
          </p>
          <MyLinkBtnStyle
            className={"flex w-full justify-center px-6 py-2 text-xl"}
            href={"/generate"}
            variant={"primary"}
          >
            Wygeneruj ikonki
          </MyLinkBtnStyle>
        </div>
        <Image
          className="mx-auto rounded shadow-xl shadow-gray-700/40 "
          src="/baner1.png"
          alt="hero image"
          width={500}
          height={300}
        />
      </section>
      <section className="container mx-auto mt-20 max-w-screen-lg text-center text-4xl ">
        <span className="">
          Nasi uzytkownicy wygenerowali już{" "}
          <span className="text-rose-400"> {data} </span> ikonki
        </span>
        <h2 className="mb-10 mt-20 text-5xl  font-medium text-rose-300">
          Zobacz jakie to proste
        </h2>
        <video className=" mx-auto " controls width={600} height={500}>
          <source src="/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag
        </video>
      </section>
      <section className="container mx-auto my-20 max-w-[700px]  ">
        <h2 className="my-6 rounded border-b-4 border-gray-500 p-2 text-center text-4xl font-bold ">
          Oszczędź swój czas i pieniadze
        </h2>
        <span className="text-lg leading-loose">
          Zatrudnienie designera do stworzenia prostej ikonki nie jest już
          konieczne. Podaj dokładny opis jak ma wyglądać Twoja ikonka i resztę w
          kilka sekund zrobi za Ciebie sztuczna inteligencja
        </span>
        <MyLinkBtnStyle
          className={"mt-6 flex w-full justify-center px-6 py-2 text-xl"}
          href={"/generate"}
          variant={"primary"}
        >
          Przejdź do generatora
        </MyLinkBtnStyle>
      </section>
    </>
  );
};

export default Home;
