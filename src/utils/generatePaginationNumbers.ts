export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // if the total number of pages is less than or equal to 5, return an array of numbers from 1 to totalPages = [1, 2, 3, 4, 5]
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // if the total number of pages is greater than 5 and the current page is between 1 and 3, return the first 3 pages, ellipsis, and the last 2 pages = [1, 2, 3, '...', 49, 50]
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // if the total number of pages is greater than 5 and the current page is between the last 3 pages, return the first 2 pages, ellipsis, and the last 3 pages = [1, 2, '...', 48, 49, 50]
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // if the total number of pages is greater than 5 and the current page is between 4 and the last 3 pages, return the first page, ellipsis, the current page -1, the current page, the current page +1, ellipsis, and the last page = [1, '...', 4, 5, 6,'...', 50]
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}
