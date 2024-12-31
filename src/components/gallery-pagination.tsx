"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/app/hooks/use-pagination";
import { usePathname } from "next/navigation";

interface GalleryPaginationProps {
  currentPage: number;
}

export default function GalleryPagination({
  currentPage,
}: GalleryPaginationProps) {
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);
  const { pages, showLeftEllipsis } = usePagination(currentPage);

  React.useEffect(() => {
    ref.current?.focus();
  }, [pages]);
  return (
    <Pagination ref={ref} className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            href={`${pathname}/?page=${currentPage - 1}`}
            aria-disabled={currentPage === 1 ? true : undefined}
          />
        </PaginationItem>
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`${pathname}/?page=${page}`}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`${pathname}/?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
