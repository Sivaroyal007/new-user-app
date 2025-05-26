import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  totalItems,
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    // Always include the first page
    pages.push(
      <button
        key={1}
        className={`flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border p-[10px] text-[13px] font-[600] ${
          1 === currentPage ? "bg-primary text-white" : "bg-white text-black"
        }`}
        onClick={() => onPageChange(1)}
      >
        {1}
      </button>,
    );

    // Include dots if there are pages between first and current-1
    if (currentPage > 3) {
      pages.push(
        <span className="text-primary" key="dot1">
          ...
        </span>,
      );
    }

    // Include pages around the current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          className={`flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border p-[10px] text-[13px] font-[600] ${
            i === currentPage ? "bg-primary text-white" : "bg-white text-black"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      );
    }

    // Include dots if there are pages between current+1 and last
    if (currentPage < totalPages - 2) {
      pages.push(<span key="dot2">...</span>);
    }

    // Always include the last page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border p-[10px] text-[13px] font-[600] ${
            totalPages === currentPage
              ? "bg-primary text-white"
              : "border-[#E8E8E8] bg-white text-[#434343]"
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  const lastItemIndex = currentPage * limit;
  const firstItemIndex = lastItemIndex - limit + 1;
  const itemsOnCurrentPage = Math.min(totalItems - firstItemIndex + 1, limit);

  return (
    totalPages > 1 && (
      <div className="mt-4 flex items-center justify-center gap-2 text-[13px] font-[600]">
      <button
        className={`px-3 py-1 text-[#434343] ${
          currentPage === 1 ? "hidden" : ""
        } `}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className={`px-3 py-1 text-[#434343] ${
          currentPage === totalPages || itemsOnCurrentPage < limit
            ? "hidden"
            : "flex"
        } `}
        disabled={currentPage === totalPages || itemsOnCurrentPage < limit}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
    )
  );
};

export default Pagination;
