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
import { useQueryStore } from "@/app/hooks/use-query-store";

interface SearchProps {
  showOnNavbar?: boolean;
}

export default function Search({ showOnNavbar = false }: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ query: string }>();
  const { query, setQuery } = useQueryStore();
  const [scrolled, setScrolled] = React.useState(false);

  const defaultValue = React.useMemo(() => {
    if (Array.isArray(params.query)) {
      return params.query.join(" ").split("%20").join(" ");
    }
    return params.query?.split("%20").join(" ") || "";
  }, [params.query]);

  const handleSearch = React.useCallback(() => {
    if (query) {
      router.push(`/search/${query}`);
    }
  }, [query, router]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && query) {
        e.preventDefault();
        router.push(`/search/${query}`);
      }
    },
    [query, router]
  );

  React.useEffect(() => {
    router.prefetch(`/search`);
  }, [query, router]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!scrolled && showOnNavbar && !pathname.startsWith("/search")) {
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
        value={query || defaultValue}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="px-4"
            onClick={handleSearch}
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
