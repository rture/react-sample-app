import React from "react";
import "./style.scss";
import classNames from "classnames";

const Paginator = ({ currentPage, onPageChange, range = 3, pageCount, ...props }) => {
  const renderedPages = [...Array(range * 2 + 1).keys()]
    .map(i => currentPage - range + i)
    .filter(i => i > 0 && i <= pageCount);

  const showStart = currentPage - range > 1;
  const showEnd = currentPage + range < pageCount;

  return (
    <div className={classNames("paging", props.className)}>
      {showStart && [
        <button content={1} onClick={() => onPageChange(1)}>
          1
        </button>,
        <>...</>
      ]}
      {renderedPages.map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page)}
        >
          {currentPage === page ? (
            <strong className="selected-page">{page}</strong>
          ) : (
            page
          )}
        </button>
      ))}
      {showEnd && [
        <>...</>,
        <button content={pageCount} onClick={() => onPageChange(pageCount)}>
          {pageCount}
        </button>
      ]}
    </div>
  );
};

export default Paginator;
