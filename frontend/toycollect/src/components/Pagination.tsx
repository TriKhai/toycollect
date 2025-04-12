import { CircleArrowRight, CircleChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePagination = (page: number) => {
    if (page == totalPages - 7 && currentPage > totalPages - 7) {
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded hover:bg-blue-300 hover:text-white text-black font-bold ${
            page === currentPage ? "bg-blue-950 text-white" : "bg-gray-200"
          }`}
        >
          ...
        </button>
      );
    }

    if (page > totalPages - 7 && currentPage > totalPages - 7) {
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded hover:bg-blue-300 hover:text-white text-black font-bold ${
            page === currentPage ? "bg-blue-950 text-white" : "bg-gray-200"
          }`}
        >
          {page + 1}
        </button>
      );
    }

    if (
      (page >= currentPage && page < currentPage + 3) ||
      (page <= totalPages && page >= totalPages - 3)
    ) {
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded hover:bg-blue-300 hover:text-white text-black font-bold ${
            page === currentPage ? "bg-blue-950 text-white" : "bg-gray-200"
          }`}
        >
          {page + 1}
        </button>
      );
    }
    if (page === currentPage + 3 && currentPage + 3 != totalPages - 3) {
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded hover:bg-blue-300 hover:text-white text-black font-bold ${
            page === currentPage ? "bg-blue-950 text-white" : "bg-gray-200"
          }`}
        >
          ...
        </button>
      );
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-300 hover:text-white text-black font-bold"
      >
        <CircleChevronLeft />
      </button>

      {[...Array(totalPages).keys()].map((page) =>
        // <button
        //   key={page}
        //   onClick={() => handlePageChange(page)}
        //   className={`px-4 py-2 rounded hover:bg-blue-300 ${
        //     page === currentPage ? "bg-blue-950 text-white" : "bg-gray-200"
        //   }`}
        // >
        //   {page + 1}
        // </button>
        handlePagination(page)
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-300 hover:text-white text-black font-bold"
      >
        <CircleArrowRight />
      </button>
    </div>
  );
}
