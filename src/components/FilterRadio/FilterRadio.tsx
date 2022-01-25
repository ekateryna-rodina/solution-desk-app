import React, { useState } from "react";
import { FilterRadioType } from "../../constants";
import { Radio } from "../Radio";

const FilterRadio = ({ group }: { group: string }) => {
  const [checkedRadio, setCheckedRadio] = useState(FilterRadioType.Is);
  return (
    <div className="mt-[2.5rem]">
      {Object.keys(FilterRadioType)
        .filter((type) => isNaN(FilterRadioType[type]))
        .map((radio, i) => (
          <Radio
            checked={
              FilterRadioType[checkedRadio].toString() == FilterRadioType[radio]
            }
            name={FilterRadioType[radio]}
            value={FilterRadioType[radio]}
            groupName={`filterRadioType_${group}`}
            onCheckedHandler={setCheckedRadio}
          />
        ))}
    </div>
  );
};

export default FilterRadio;
