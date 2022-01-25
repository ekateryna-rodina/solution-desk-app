import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { WordSearchFilter } from "../WordSearchFilter";

const AddNewFilter = () => {
  const [toggle, setToggle] = useState(true);
  const { options } = useAppSelector((state) => state.filter);
  const [filterByName, setFilterName] = useState<keyof typeof options | null>(
    null
  );
  const renderFilterNames = () => {
    return Object.keys(options).map((f) => (
      <li
        key={f}
        onMouseEnter={() => setFilterName(f)}
        className="relative px-4 py-2 hover:bg-blueExtend/50 hover:text-white cursor-pointer"
      >
        <span>{f}</span>
        <div
          className={`absolute -top-2 bg-white shadow transition ease-in-out p-4 ${
            filterByName === f
              ? "opacity-100 -translate-x-[11.55rem]"
              : "opacity-0 -translate-x-[11rem] pointer-events-none"
          }`}
        >
          <WordSearchFilter group={f} data={options[f]} />
        </div>
      </li>
    ));
  };
  return (
    <div className="relative">
      <div className="bg-white p-2">
        <span>Add Filter</span>
      </div>
      <div className="absolute z-10 right-0 top-12 bg-white shadow rounded">
        <ul className={`py-2 ${toggle ? "opacity-100" : "opacity-0"}`}>
          {renderFilterNames()}
        </ul>
      </div>
    </div>
  );
};

export default AddNewFilter;
