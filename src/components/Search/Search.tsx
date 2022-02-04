import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearchQuery } from "../../features/usersSearch/usersSearch-slice";

const Search = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.usersSearch);
  const onSearchHandler = (query) => {
    dispatch(setSearchQuery(query));
  };
  return (
    <input
      value={search}
      onChange={(e) => onSearchHandler(e.currentTarget.value)}
      type="text"
      placeholder="Search..."
      className="w-5/6 sm:w-80 md:w-80 lg:w-120 h-8 p-2 bg-white rounded-md shadow focus:outline-blueExtend/50"
    ></input>
  );
};

export default Search;
