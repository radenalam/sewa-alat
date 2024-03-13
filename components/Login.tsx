import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p className="rounded-md">{session.user?.email}</p>
        <Button className="rounded-md" onClick={() => signOut()}>
          Keluar
        </Button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
}
