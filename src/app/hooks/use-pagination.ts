export function usePagination(page: number) {
  const previousPage = page > 1 ? page - 1 : null;
  const nextPage = page + 1;
  const pages = [previousPage, page, nextPage].filter(
    (p): p is number => p !== null
  );

  const showLeftEllipsis = previousPage ? true : false;

  return {
    showLeftEllipsis: showLeftEllipsis,
    pages: pages,
  };
}
