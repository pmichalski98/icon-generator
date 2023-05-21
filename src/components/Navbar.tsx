import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import MyLink from "~/components/MyLink";
import { api } from "~/utils/api";
import React, { useState } from "react";
import { GiTwoCoins, GiHamburgerMenu } from "react-icons/gi";
import { BiRefresh } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

export default function Navbar() {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!data;
  const { buyCredits } = useBuyCredits();
  const { data: credits } = api.user.getCredits.useQuery();
  const utils = api.useContext();
  console.log("halo");
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
          {isOpen && <MyLink href="/">Logo</MyLink>}
          <div className={`hidden items-center gap-4 md:flex `}>
            <MyLink href="/">Logo</MyLink>
            <MyLink href="/generate">Generate</MyLink>
            {isLoggedIn && <MyLink href="/collection">Collection</MyLink>}
            <MyLink href="/community">Community</MyLink>
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
                  <BiRefresh size={25} /> {credits}
                </button>
                <GiTwoCoins size={30} color={"yellow"} />
              </div>
              <Button
                className="shadow-pink-400/60"
                onClick={() => {
                  buyCredits().catch(console.error);
                }}
              >
                Buy credits
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
          <MyLink href="/generate">Generate</MyLink>
          {isLoggedIn && <MyLink href="/collection">Collection</MyLink>}
          <MyLink href="/community">Community</MyLink>
        </div>
      )}
    </nav>
  );
}
