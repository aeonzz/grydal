"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseAsString, useQueryState } from "nuqs";

export default function SearchFilter() {
  const [orientation, setOrientation] = useQueryState(
    "orientation",
    parseAsString.withDefault("all")
  );
  
  return (
    <>
      <Select
        value={!orientation ? "all" : orientation}
        onValueChange={setOrientation}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Orientations" defaultValue="all" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Orientations</SelectItem>
          <SelectItem value="landscape">Landscape</SelectItem>
          <SelectItem value="portrait">Portrait</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}