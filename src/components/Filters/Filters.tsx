import React from "react";
import { AddNewFilter } from "../AddNewFilter";
import { AppliedFilters } from "../AppliedFilters";

const Filters = () => {
  return (
    <div>
      <AppliedFilters />
      <AddNewFilter />
    </div>
  );
};

export default Filters;
