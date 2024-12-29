import { getServerSession } from "@/lib/server-session";
import React from "react";
import HeroCtaButton from "./hero-cta-button";
import Search from "./search";

export default async function HeroCta() {
  const session = await getServerSession();
  return (
    <React.Fragment>
      {session ? (
        <Search />
      ) : (
        <HeroCtaButton />
      )}
    </React.Fragment>
  );
}
