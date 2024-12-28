import React from "react";
import { headers } from "next/headers";
import UserNav from "./user-nav";
import SignInDialog from "./signin-dialog";
import { getServerSession } from "@/lib/server-session";

export async function SignInButton() {
  const session = await getServerSession();

  return (
    <React.Fragment>
      {session?.session ? <UserNav session={session} /> : <SignInDialog />}
    </React.Fragment>
  );
}

function checkOptimisticSession(headers: Headers) {
  const guessIsSignIn =
    headers.get("cookie")?.includes("better-auth.session") ||
    headers.get("cookie")?.includes("__Secure-better-auth.session-token");
  return !!guessIsSignIn;
}

export async function SignInFallback() {
  //to avoid flash of unauthenticated state
  const guessIsSignIn = checkOptimisticSession(await headers());
  return (
    <React.Fragment>{guessIsSignIn ? null : <SignInDialog />}</React.Fragment>
  );
}
