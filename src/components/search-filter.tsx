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
import { useOrientation } from "@/app/hooks/use-orientation";

export default function SearchFilter() {
  const { orientation, setOrientation } = useOrientation();
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
