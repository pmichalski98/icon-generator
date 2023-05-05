import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

export default function Navbar() {
  const { data } = useSession();
  const isLoggedIn = !!data;

  return (
    <nav className="flex justify-end px-8 py-4">
      <div className="self-end">
        {!isLoggedIn ? (
          <Button onClick={() => signIn().catch(console.error)}>Zaloguj</Button>
        ) : (
          <Button onClick={() => signOut().catch(console.error)}>
            Wyloguj
          </Button>
        )}
      </div>
    </nav>
  );
}
