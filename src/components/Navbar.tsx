import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import MyLink from "~/components/MyLink";
import { api } from "~/utils/api";

export default function Navbar() {
  const { data } = useSession();
  const isLoggedIn = !!data;
  const { buyCredits } = useBuyCredits();
  const { data: credits } = api.user.getCredits.useQuery();

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
            <div className=" self-center">Credits {credits}</div>
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
