import React from "react";
import { usePagination } from "../../hooks/usePagination";
import styles from "./Pagination.module.css";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    fetchData
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });


  const onNext = () => {
    onPageChange(currentPage + 1);
    fetchData(pageSize,pageSize*(currentPage));
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    console.log(currentPage);
    fetchData(pageSize,pageSize*(currentPage-2))
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </button>

      <h6 className={styles.paginationPageCount}>
        Page {currentPage} of {lastPage}
      </h6>

      <button
        className={styles.paginationButton}
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
