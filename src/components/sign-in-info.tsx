"use client";

import { Session } from "@/lib/auth-type";
import React from "react";
import { Button } from "./ui/button";
import { parseAsBoolean, useQueryState } from "nuqs";

interface SignInInfoProps {
  session: Session | null;
}

export default function SignInInfo({ session }: SignInInfoProps) {
  const [open, setOpen] = useQueryState(
    "sign-in",
    parseAsBoolean.withDefault(false).withOptions({ history: "replace" })
  );

  if (session) return null;

  return (
    <div className="absolute top-0 flex h-screen w-full flex-col justify-end rounded-lg bg-gradient-to-t from-background to-transparent p-4 text-center">
      <p className="mb-20 text-lg font-semibold">
        You need to{" "}
        <Button
          variant="link"
          onClick={() => setOpen(!open)}
          className="p-0 text-lg text-blue-600 hover:underline"
        >
          sign in
        </Button>{" "}
        to view more photos.
      </p>
    </div>
  );
}
