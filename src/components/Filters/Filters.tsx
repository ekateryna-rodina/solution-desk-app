import React from "react";
import { useAppSelector } from "../../app/hooks";
import { AddNewFilter } from "../AddNewFilter";
import { AppliedFilters } from "../AppliedFilters";

const Filters = () => {
  const { data } = useAppSelector((state) => state.filter);
  console.log(data);
  return (
    <div>
      <AppliedFilters />
      <AddNewFilter />
    </div>
  );
};

export default Filters;
