import React, { useEffect, useState } from "react";
import { NextIcon, PrevIcon } from "../icons";

type PaginateType = {
  currentPage: number;
  numberOfPages: number;
  next: () => void;
  previous: () => void;
  setPage: (num: number) => void;
};

const Pagination = ({
  currentPage,
  numberOfPages,
  next,
  previous,
  setPage,
}: PaginateType) => {
  const [numbring, setNumbring] = useState<number[]>([]);
  const [pageOptions, setPageOptions] = useState<number[]>([]);

  useEffect(() => {
    const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
    setNumbring(pages);
    setPageOptions(getPageOptions(pages, currentPage));
  }, [numberOfPages, currentPage]);

  const getPageOptions = (pages: number[], current: number) => {
    const visiblePages = 3;
    const pageOptions = [];

    if (pages.length <= 5) {
      return pages; // Show all pages if less than or equal to 5
    }

    // Add first page
    pageOptions.push(pages[0]);

    // Add ellipsis if needed
    if (current > visiblePages + 1) {
      pageOptions.push(-1); // Use -1 to indicate ellipsis
    }

    // Add pages around current page
    const start = Math.max(2, current - visiblePages); // Start from 2 to avoid duplicating 1
    const end = Math.min(current + visiblePages, pages.length);
    for (let i = start; i <= end; i++) {
      pageOptions.push(i);
    }

    // Add ellipsis if needed
    if (current < pages.length - visiblePages) {
      pageOptions.push(-1); // Use -1 to indicate ellipsis
    }

    // Add last page
    if (pages.length > 1) {
      // Ensure that we only add the last page if there's more than one page
      pageOptions.push(pages[pages.length - 1]);
    }

    return pageOptions;
  };

  const handlePageChange = (page: number) => {
    if (page === -1) return; // Ignore ellipsis clicks
    setPage(page);
  };

  return (
    <div className="pagination">
      <div className="total">
        <span>Showing</span>
        <select
          value={currentPage}
          onChange={(e) => setPage(Number(e.target.value))}
          className="control"
        >
          {numbring.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span>out of {numberOfPages}</span>
      </div>

      <div className="numbring">
        <button type="button" onClick={previous} disabled={currentPage === 1}>
          <PrevIcon />
        </button>

        {pageOptions.map((num, idx) => (
          <span
            key={idx}
            onClick={() => handlePageChange(num)}
            className={num === currentPage ? "active" : ""}
          >
            {num === -1 ? "..." : num}
          </span>
        ))}

        <button
          type="button"
          onClick={next}
          disabled={currentPage === numberOfPages}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
