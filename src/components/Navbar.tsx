import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import MyLink from "~/components/MyLink";
import { api } from "~/utils/api";
import React from "react";
import { GiTwoCoins } from "react-icons/gi";
import { BiRefresh } from "react-icons/bi";

export default function Navbar() {
  const { data } = useSession();
  const isLoggedIn = !!data;
  const { buyCredits } = useBuyCredits();
  const { data: credits } = api.user.getCredits.useQuery();
  const utils = api.useContext();
  async function refreshCredits() {
    await utils.user.getCredits.invalidate();
  }
  return (
    <nav className="container mx-auto flex justify-between gap-4  px-4 py-4">
      <div className="flex items-center gap-4 text-lg">
        <MyLink href="/">Logo</MyLink>
        <MyLink href="/generate">Generate</MyLink>
        {isLoggedIn && <MyLink href="/collection">Collection</MyLink>}
        <MyLink href="/community">Community</MyLink>
      </div>
      <div className="flex gap-4">
        {!isLoggedIn ? (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <Button onClick={() => signIn().catch(console.error)}>Zaloguj</Button>
        ) : (
          <>
            <div className=" flex items-center gap-1 rounded-full text-center text-lg font-medium ">
              <button
                onClick={refreshCredits}
                className="flex items-center gap-2"
              >
                <BiRefresh size={25} /> {credits}
              </button>
              <GiTwoCoins size={30} color={"yellow"} />
            </div>
            <Button
              className="shadow-pink-400/60"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => buyCredits().catch(console.error)}
            >
              Buy credits
            </Button>
            <Button
              variant={"secondary"}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => signOut().catch(console.error)}
            >
              Wyloguj
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
