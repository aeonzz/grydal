"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseAsString, useQueryState } from "nuqs";

export default function SearchFilter() {
  const [orientation, setOrientation] = useQueryState(
    "orientation",
    parseAsString.withDefault("all").withOptions({ history: "push" })
  );
  
  return (
    <>
      <Tooltip>
        <Select
          value={!orientation ? "all" : orientation}
          onValueChange={setOrientation}
        >
          <TooltipTrigger asChild>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Orientations" defaultValue="all" />
            </SelectTrigger>
          </TooltipTrigger>
          <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
            <SelectItem value="all">All Orientations</SelectItem>
            <SelectItem value="landscape">Landscape</SelectItem>
            <SelectItem value="portrait">Portrait</SelectItem>
          </SelectContent>
        </Select>
        <TooltipContent>
          <p>Select orientation</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
