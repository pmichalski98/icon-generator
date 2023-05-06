import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { Simulate } from "react-dom/test-utils";
import { useBuyCredits } from "~/hooks/useBuyCredits";

export default function Navbar() {
  const { data } = useSession();
  const isLoggedIn = !!data;
  const { buyCredits } = useBuyCredits();

  return (
    <nav className="flex justify-end px-8 py-4">
      <div className="flex gap-4 self-end">
        {!isLoggedIn ? (
          <Button onClick={() => signIn().catch(console.error)}>Zaloguj</Button>
        ) : (
          <>
            <Button onClick={() => buyCredits().catch(console.error)}>
              Buy credits
            </Button>
            <Button onClick={() => signOut().catch(console.error)}>
              Wyloguj
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
