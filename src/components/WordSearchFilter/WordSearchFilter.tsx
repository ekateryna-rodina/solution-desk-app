import React from "react";
import { Autocomplete } from "../Autocomplete";
import { FilterRadio } from "../FilterRadio";

type WordSearchFilterProps = {
  data: string[];
  group: string;
};
const WordSearchFilter = ({ data, group }: WordSearchFilterProps) => {
  console.log(data);
  return (
    <>
      <Autocomplete data={data} />
      <FilterRadio group={group} />
      <div>
        {/* <button>Cancel</button> */}
        {/* <input type="button" value="Apply Filter" /> */}
      </div>
    </>
  );
};

export default WordSearchFilter;
