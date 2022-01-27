import React from "react";
import { useAppSelector } from "../../app/hooks";
import { IFilterApplied } from "../../types";
import { AppliedFiltersItem } from "../AppliedFiltersItem";

const AppliedFilters = () => {
  const { applied } = useAppSelector((state) => state.filter);
  return (
    <div className="flex justify-end items-center mr-4 gap-4">
      {applied.map((filter: IFilterApplied) => (
        <AppliedFiltersItem key={filter["property"]} {...filter} />
      ))}
    </div>
  );
};

export default AppliedFilters;
