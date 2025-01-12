interface IJobPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  isPlaceholderData: boolean;
}

export default function JobPagination({
  page,
  setPage,
  totalPages,
  isPlaceholderData,
}: IJobPaginationProps) {
  return (
    <>
      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-2 mt-7">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-teal-500 rounded disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
        >
          Prev
        </button>

        {/* Dynamically generates a series of page number buttons using Array.from() */}

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-2 rounded ${
                page === pageNumber
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || page === totalPages}
          className="px-4 py-2 text-white bg-teal-500 rounded disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
}
