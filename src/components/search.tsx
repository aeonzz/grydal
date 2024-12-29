"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { usePathname, useParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";

interface SearchProps {
  showOnNavbar?: boolean;
}

export default function Search({ showOnNavbar = false }: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && query) {
        e.preventDefault();
        router.push(`/search/${query}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [query, router]);

  if (showOnNavbar && !pathname.startsWith("/search")) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-lg",
        showOnNavbar ? "w-[512px]" : "max-w-md border bg-background p-2"
      )}
    >
      <Input
        placeholder="Search photos"
        className="bg-background"
        defaultValue={
          Array.isArray(params.query)
            ? params.query.join(" ").split("%20").join(" ")
            : params.query?.split("%20").join(" ")
        }
        onChange={(e) => setQuery(e.target.value)}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="px-4"
            onClick={() => {
              if (query) {
                router.push(`/search/${query}`);
              }
            }}
          >
            <SearchIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Search</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
