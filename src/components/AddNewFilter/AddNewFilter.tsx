import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIsShown } from "../../features/filter/filter-slice";
import CaretDown from "../icons/CaretDown";
import CaretUp from "../icons/CaretUp";
import { WordSearchFilter } from "../WordSearchFilter";

const AddNewFilter = () => {
  const { options, isShown } = useAppSelector((state) => state.filter);
  const [filterByName, setFilterName] = useState<keyof typeof options | null>(
    null
  );
  const dispatch = useAppDispatch();
  const renderFilterNames = () => {
    return Object.keys(options).map((f) => (
      <li
        role="presentation"
        key={f}
        onClick={() => setFilterName(f)}
        className="relative px-4 py-2 hover:bg-blueExtend/50 text-sm text-slate-600 hover:text-white cursor-pointer"
      >
        {f}
        <div
          className={`absolute -top-2 bg-white shadow-md transition ease-in-out p-4 rounded ${
            filterByName === f
              ? "opacity-100 -translate-x-[11.75rem]"
              : "opacity-0 -translate-x-[11rem] pointer-events-none"
          }`}
        >
          <WordSearchFilter
            tabindex={`${filterByName === f ? "0" : "-1"}`}
            group={f}
            data={options[f]}
          />
        </div>
      </li>
    ));
  };
  const onShowFilterHandler = () => {
    dispatch(setIsShown(!isShown));
  };
  return (
    <div className="relative">
      <button
        onClick={onShowFilterHandler}
        className={`bg-white p-2 flex flex-row justify-between items-center rounded  hover:shadow-md ${
          isShown ? "shadow-md" : ""
        }`}
      >
        <span className="text-slate-600 text-sm font-medium mr-2">
          Add Filter
        </span>
        {isShown ? (
          <CaretUp fill="fill-slate-600" />
        ) : (
          <CaretDown fill="fill-slate-600" />
        )}
      </button>
      <div
        className={`absolute z-10 right-0 top-12 bg-white shadow-md rounded ${
          isShown ? "opacity-100" : "opacity-0"
        }`}
      >
        <ul role="tablist" className="py-2">
          {renderFilterNames()}
        </ul>
      </div>
    </div>
  );
};

export default AddNewFilter;
