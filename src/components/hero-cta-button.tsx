"use client";

import React from "react";
import { Button } from "./ui/button";
import { parseAsBoolean, useQueryState } from "nuqs";

export default function HeroCtaButton() {
  const [open, setOpen] = useQueryState(
    "sign-in",
    parseAsBoolean.withDefault(false).withOptions({ history: "replace" })
  );
  return (
    <Button onClick={() => setOpen(!open)} variant="default" size="lg">
      Get started
    </Button>
  );
}
