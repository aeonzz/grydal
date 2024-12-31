import React from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchButtonProps {
  handleSearch: () => void;
}

export default function SearchButton({ handleSearch }: SearchButtonProps) {
  return (
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
  );
}
