import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setCurrentFilterProperty,
  setIsShown,
} from "../../features/filter/filter-slice";
import { IFilterProperties } from "../../types";
import CaretDownIcon from "../icons/CaretDownIcon";
import CaretUpIcon from "../icons/CaretUpIcon";
import { WordSearchFilter } from "../WordSearchFilter";

const AddNewFilter = () => {
  const {
    properties,
    isShown,
    current: { property },
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const onSelectCurrentPropertyFilter = (current: keyof IFilterProperties) => {
    dispatch(setCurrentFilterProperty(current));
  };

  const renderFilterNames = () => {
    return Object.keys(properties).map((f) => (
      <li
        role="presentation"
        key={f}
        onClick={() =>
          onSelectCurrentPropertyFilter(f as keyof IFilterProperties)
        }
        className={`relative px-4 py-2 hover:bg-blueExtend/50 
        text-sm text-slate-600 hover:text-white cursor-pointer ${
          property === f ? "bg-blueExtend  text-white hover:bg-blueExtend " : ""
        }`}
      >
        {f}
        <div
          className={`absolute -top-2 bg-white shadow-md transition ease-in-out p-4 rounded ${
            property === f
              ? "opacity-100 -translate-x-[11.75rem]"
              : "opacity-0 -translate-x-[11rem] pointer-events-none"
          }`}
        >
          <WordSearchFilter
            tabindex={`${property === f ? "0" : "-1"}`}
            group={f}
            data={properties[f]}
          />
        </div>
      </li>
    ));
  };
  const onShowFilterHandler = () => {
    if (isShown) {
      dispatch(setCurrentFilterProperty(null));
    }
    dispatch(setIsShown(!isShown));
  };
  return (
    <div className="relative">
      <button
        onClick={onShowFilterHandler}
        className={`bg-white p-2 flex flex-row justify-between items-center rounded border-[1px] border-white  hover:shadow-md ${
          isShown ? "shadow-md" : ""
        }`}
      >
        <span className="text-slate-600 text-sm font-medium mr-2">
          Add Filter
        </span>
        {isShown ? (
          <CaretUpIcon fill="fill-slate-600" />
        ) : (
          <CaretDownIcon fill="fill-slate-600" />
        )}
      </button>
      <div
        className={`absolute z-10 right-0 top-12 bg-white shadow-md rounded ${
          isShown ? "opacity-100" : "opacity-0 pointer-events-none"
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
