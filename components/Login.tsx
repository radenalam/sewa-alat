import { signIn, signOut, useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Selamat datang, {session.user?.email}</p>
        <button onClick={() => signOut()}>Keluar</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
}
