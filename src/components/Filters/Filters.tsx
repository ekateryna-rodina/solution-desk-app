import React from "react";
import { useAppSelector } from "../../app/hooks";
import { AddNewFilter } from "../AddNewFilter";
import { AppliedFilters } from "../AppliedFilters";

const Filters = () => {
  const { data } = useAppSelector((state) => state.filter);
  return (
    <div className="flex justify-end mx-8 mb-4">
      <AppliedFilters />
      <AddNewFilter />
    </div>
  );
};

export default Filters;
