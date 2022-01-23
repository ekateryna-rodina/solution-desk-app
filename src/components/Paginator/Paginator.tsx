import React from "react";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPage } from "../../features/usersPagination/usersPagination-slice";
import styled from "./Paginator.module.css";

const Paginator = () => {
  const { page, limit, totalPages } = useAppSelector(
    (state) => state.usersPagination
  );
  const dispath = useAppDispatch();
  function handlePageClick({ selected: selectedPage }) {
    dispath(setPage({ page: selectedPage + 1, limit }));
  }
  return (
    <div>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName={styled.pagination}
        previousLinkClassName={styled.paginationLink}
        nextLinkClassName={styled.paginationLink}
        disabledClassName={styled.paginationLinkDisabled}
        activeClassName={styled.paginationLinkActive}
        pageClassName={styled.pageClassName}
      />
    </div>
  );
};

export default Paginator;
