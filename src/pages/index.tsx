import { type NextPage } from "next";
import React from "react";
import Image from "next/image";
import MyLinkBtnStyle from "~/components/MyLinkBtnStyle";

const Home: NextPage = () => {
  return (
    <>
      <section className=" flex flex-col gap-4 md:flex-row ">
        <div className="mb-20">
          <h1 className="text-4xl">Generate icons in under a minute</h1>
          <p className="mb-10 py-4 text-lg">
            Fastest icons generator using AI power.
          </p>
          <MyLinkBtnStyle
            className={"px-6 py-2 text-xl"}
            href={"/generate"}
            variant={"primary"}
          >
            Generate Icons
          </MyLinkBtnStyle>
        </div>
        <Image
          className="rounded shadow-xl shadow-gray-700/40 "
          src="/miata.jpg"
          alt="miata image"
          width={400}
          height={300}
        />
      </section>
    </>
  );
};

export default Home;
