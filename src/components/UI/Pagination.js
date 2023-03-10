import { useState } from "react";

const Pagination = (props) => {
  let { paginationValues } = props;
  const [nextDisabled, setNextDisabled] = useState(false);
  const [preDisabled, setPreDisabled] = useState(true);

  const updatePageCount = (e) => {
    const operation = e.target.name;
    setNextDisabled(false);
    setPreDisabled(false);
    if (operation === "next") {
      let end = paginationValues.to + paginationValues.incrementDecrementBy;

      if (end > paginationValues.total) {
        end = paginationValues.total;
      }

      paginationValues = {
        ...paginationValues,
        page: paginationValues.page + 1,
        start: paginationValues.start + paginationValues.incrementDecrementBy,
        to: end,
      };
      if (paginationValues.to === paginationValues.total) {
        setNextDisabled(true);
      }
    }
    if (operation === "prev") {
      let remainder =
        paginationValues.to % paginationValues.incrementDecrementBy;
      console.log(paginationValues.to);
      //console.log(paginationValues.incrementDecrementBy);
      console.log(remainder);
      if (remainder !== 0) {
        if (remainder > paginationValues.incrementDecrementBy / 2) {
          remainder = paginationValues.incrementDecrementBy - remainder;
        }
        paginationValues.to = paginationValues.to + remainder;
      }
      paginationValues = {
        ...paginationValues,
        page: paginationValues.page - 1,
        to: paginationValues.to - paginationValues.incrementDecrementBy,
        start: paginationValues.start - paginationValues.incrementDecrementBy,
      };
      if (paginationValues.start === 1) {
        setPreDisabled(true);
      }
    }
    props.handlePageCount(paginationValues);
  };
  return (
    <div className="mx-auto w-full bg-slate-300">
      <div className="flex flex-col items-center ">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {paginationValues.start}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {paginationValues.to}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {paginationValues.total}
          </span>{" "}
          Entries
        </span>

        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            name="prev"
            onClick={updatePageCount}
            disabled={preDisabled}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            name="next"
            onClick={updatePageCount}
            disabled={nextDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
