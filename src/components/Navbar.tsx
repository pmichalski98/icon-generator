import { signIn, signOut, useSession } from "next-auth/react";
import Button, { btnClasses } from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import Link from "next/link";
import MyLink from "~/components/MyLink";

export default function Navbar() {
  const { data } = useSession();
  const isLoggedIn = !!data;
  const { buyCredits } = useBuyCredits();

  return (
    <header className="container mx-auto flex justify-between gap-4 px-4 py-4">
      <div className="flex items-center gap-4 text-lg">
        <MyLink href="/">Logo</MyLink>
        <MyLink href="/generate">Generate</MyLink>
      </div>
      <div className="flex gap-4">
        {!isLoggedIn ? (
          <Button onClick={() => signIn().catch(console.error)}>Zaloguj</Button>
        ) : (
          <>
            <Button onClick={() => buyCredits().catch(console.error)}>
              Buy credits
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => signOut().catch(console.error)}
            >
              Wyloguj
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
