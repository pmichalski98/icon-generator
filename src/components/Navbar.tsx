import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import MyLink from "~/components/MyLink";
import { api } from "~/utils/api";
import React, { useState } from "react";
import { GiTwoCoins, GiHamburgerMenu } from "react-icons/gi";
import { BiRefresh } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

export default function Navbar() {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!data;
  const { buyCredits } = useBuyCredits();
  const {
    data: credits,
    error,
    isLoading,
  } = api.user.getCredits.useQuery(undefined, { enabled: isLoggedIn });

  const utils = api.useContext();
  async function refreshCredits() {
    await utils.user.getCredits.invalidate();
  }
  return (
    <nav className="container mx-auto ">
      <div className="flex justify-between  gap-4 px-4 py-4">
        <div className="flex items-center gap-4 text-lg">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? (
              <GiHamburgerMenu
                size={30}
                className="cursor-pointer hover:text-gray-300 md:hidden"
              />
            ) : (
              <IoCloseSharp
                className="cursor-pointer hover:text-gray-300 md:hidden"
                color=""
                size={35}
              />
            )}
          </button>
          <MyLink
            onClick={() => setIsOpen(false)}
            className="border-none"
            href="/"
          >
            <Image
              className="rounded-lg "
              alt={"logo"}
              src={"/logo1.jpg"}
              width={50}
              height={50}
            />
          </MyLink>
          <div className={`hidden items-center gap-4 md:flex `}>
            <MyLink href="/generate">Generator</MyLink>
            {isLoggedIn && <MyLink href="/collection">Kolekcja</MyLink>}
            <MyLink href="/community">Społeczność</MyLink>
          </div>
        </div>
        <div className="flex gap-4">
          {!isLoggedIn ? (
            <Button
              onClick={() => {
                signIn().catch(console.error);
              }}
            >
              Zaloguj
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-1 rounded-full text-center text-lg font-medium ">
                <button
                  onClick={() => {
                    refreshCredits().catch(console.error);
                  }}
                  className="flex items-center gap-2"
                >
                  <BiRefresh size={25} />
                </button>
                <p>{credits}</p>
                <GiTwoCoins size={30} className="opacity-80" color={"yellow"} />
              </div>
              <Button
                className="shadow-pink-400/60"
                onClick={() => {
                  buyCredits().catch(console.error);
                }}
              >
                Doładuj konto
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => {
                  signOut().catch(console.error);
                }}
              >
                Wyloguj
              </Button>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className={`flex flex-col items-center gap-2 text-lg md:hidden`}>
          <MyLink onClick={() => setIsOpen(false)} href="/generate">
            Generator
          </MyLink>
          {isLoggedIn && (
            <MyLink onClick={() => setIsOpen(false)} href="/collection">
              Kolekcja
            </MyLink>
          )}
          <MyLink onClick={() => setIsOpen(false)} href="/community">
            Społeczność
          </MyLink>
        </div>
      )}
    </nav>
  );
}
