import { getServerSession } from "@/lib/server-session";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "./icons/search";
import HeroCtaButton from "./hero-cta-button";

export default async function HeroCta() {
  const session = await getServerSession();
  return (
    <React.Fragment>
      {session ? (
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg border bg-background p-2">
          <Input placeholder="Search images" className="" />
          <SearchIcon />
        </div>
      ) : (
        <HeroCtaButton />
      )}
    </React.Fragment>
  );
}
