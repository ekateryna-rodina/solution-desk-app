import React from "react";
import { Autocomplete } from "../Autocomplete";
import { FilterRadio } from "../FilterRadio";

type WordSearchFilterProps = {
  data: string[];
};
const WordSearchFilter = ({ data }: WordSearchFilterProps) => {
  console.log(data);
  return (
    <>
      <Autocomplete data={data} />
      <FilterRadio />
      <div>
        {/* <button>Cancel</button> */}
        {/* <input type="button" value="Apply Filter" /> */}
      </div>
    </>
  );
};

export default WordSearchFilter;
