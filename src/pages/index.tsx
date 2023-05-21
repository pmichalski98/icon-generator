import { type NextPage } from "next";
import React from "react";
import Image from "next/image";
import MyLinkBtnStyle from "~/components/MyLinkBtnStyle";
import { AiOutlineArrowDown } from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <>
      <section className=" flex flex-col justify-around gap-4 md:flex-row ">
        <div className="mb-20">
          <h1 className="text-5xl font-medium leading-tight">
            Wygeneruj ikonki w 60 sekund
          </h1>
          <p className="mb-10 py-4 text-lg">
            Szybko wygeneruj swoje ikonki za pomocą sztucznej inteligencji.
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
          className="rounded shadow-xl shadow-gray-700/40 "
          src="/baner1.png"
          alt="hero image"
          width={500}
          height={300}
        />
      </section>
    </>
  );
};

export default Home;
