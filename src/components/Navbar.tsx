import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import MyLink from "~/components/MyLink";
import { api } from "~/utils/api";
import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu, GiTwoCoins } from "react-icons/gi";
import { BiRefresh } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import button from "./Button";

export default function Navbar() {
  const { data } = useSession();
  const isLoggedIn = !!data;
  const { buyCredits } = useBuyCredits();
  const {
    data: credits,
    error,
    isLoading,
  } = api.user.getCredits.useQuery(undefined, { enabled: isLoggedIn });
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const utils = api.useContext();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.body.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  async function refreshCredits() {
    await utils.user.getCredits.invalidate();
  }

  return (
    <nav className="container mx-auto ">
      <div className="flex justify-between  gap-4 px-4 py-4">
        <div className="flex items-center gap-4 text-lg">
          <button
            ref={btnRef}
            className=" text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen ? (
              <GiHamburgerMenu
                size={30}
                className="pointer-events-none cursor-pointer hover:text-gray-300 md:hidden"
              />
            ) : (
              <IoCloseSharp
                className="pointer-events-none cursor-pointer hover:text-gray-300 md:hidden"
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
              className=" min-h-[50px] min-w-[50px] rounded-lg"
              alt={"logo"}
              src={"/aiicon.png"}
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
              <div className="flex flex-wrap items-center gap-1 rounded-full text-center text-lg font-medium ">
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
