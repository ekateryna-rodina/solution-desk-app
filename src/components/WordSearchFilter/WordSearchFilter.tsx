import React from "react";
import { Autocomplete } from "../Autocomplete";
import { FilterRadio } from "../FilterRadio";

type WordSearchFilterProps = {
  data: string[];
  group: string;
  tabindex: string | number;
};
const WordSearchFilter = ({ tabindex, data, group }: WordSearchFilterProps) => {
  return (
    <>
      <Autocomplete data={data} tabindex={+tabindex} />

      <FilterRadio group={group} />
      <div>
        {/* <button>Cancel</button> */}
        {/* <input type="button" value="Apply Filter" /> */}
      </div>
    </>
  );
};
export default React.memo(WordSearchFilter);
