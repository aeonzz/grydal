"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GalleryPaginationProps {
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
}

export default function GalleryPagination({
  page,
  setPage,
  isLoading,
}: GalleryPaginationProps) {
  return (
    <div className="mt-4 flex w-full justify-between">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="group gap-1 pl-2.5"
            variant="ghost"
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || isLoading}
          >
            <ArrowLeft className="h-4 w-4 opacity-60 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Previous page</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="group gap-1 pr-2.5"
            disabled={isLoading}
            onClick={() => setPage(page + 1)}
          >
            Next
            <ArrowRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Next page</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
