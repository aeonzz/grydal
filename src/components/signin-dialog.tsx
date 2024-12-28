
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { parseAsBoolean, useQueryState } from "nuqs";
import { Button } from "./ui/button";
import Signin from "./signin";

export default function SignInDialog() {
  const [open, setOpen] = useQueryState(
    "sign-in",
    parseAsBoolean.withDefault(false).withOptions({ history: "replace" }),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm [&>button]:hidden">
        <DialogHeader className="items-center">
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Choose your preferred sign-in method
          </DialogDescription>
        </DialogHeader>
        <Signin />
      </DialogContent>
    </Dialog>
  );
}
