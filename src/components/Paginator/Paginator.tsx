import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import { setPage } from "../../features/usersPagination/usersPagination-slice";

const Paginator = () => {
  const { page, limit } = useAppSelector((state) => state.usersPagination);

  console.log(page, limit);
  const { data, isLoading } = useGetAllUsersQuery(
    { page, limit },
    { skip: !page || !limit }
  );
  const dispath = useAppDispatch();
  const offset = page * limit;
  const totalPages = 10;
  function handlePageClick({ selected: selectedPage }) {
    dispath(setPage({ page: selectedPage, limit }));
  }
  useEffect(() => {
    console.log(data);
  }, []);
  if (!data || !Object.keys(data).length) return <></>;
  return (
    <div>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {data.result}
    </div>
  );
};

export default Paginator;
