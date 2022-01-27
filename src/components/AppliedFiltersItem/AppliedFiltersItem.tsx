import React from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  TermSearchFilterStringsMap,
  TermSearchFilterType,
} from "../../constants";
import { removeFilter } from "../../features/filter/filter-slice";
import { IFilterProperties } from "../../types";
import RemoveIcon from "../icons/RemoveIcon";

type AppliedFiltersItemProps = {
  property: keyof IFilterProperties;
  term?: string;
  termSearchFilterType?: TermSearchFilterType | number;
  level?: "low" | "medium" | "high";
};

const AppliedFiltersItem = ({
  property,
  term,
  termSearchFilterType,
  level,
}: AppliedFiltersItemProps) => {
  const dispatch = useAppDispatch();
  const onRemoveFilterHandler = () => {
    dispatch(
      removeFilter({
        property,
        term,
        termSearchFilterType,
        level,
      })
    );
  };
  return (
    <div className="flex justify-start items-center rounded border-[1px] border-slate-400 p-2 gap-2">
      <span className="text-slate-800 text-sm">{property}</span>
      <span className="text-slate-400 text-sm">
        {TermSearchFilterStringsMap[termSearchFilterType!]}
      </span>
      <span className="text-slate-800 text-sm">{term}</span>
      <button
        className="bg-transparent p-0 m-0 outline-none"
        onClick={onRemoveFilterHandler}
      >
        <RemoveIcon fill={"fill-slate-600"} />
      </button>
    </div>
  );
};

export default AppliedFiltersItem;
