import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FilterRadioType } from "../../constants";
import { setCurrentFilterType } from "../../features/filter/filter-slice";
import { Radio } from "../Radio";

const FilterRadio = ({ group }: { group: string }) => {
  const {
    current: { filterType },
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const onFilterTypeRadioChecked = (filterType: FilterRadioType) => {
    dispatch(setCurrentFilterType(filterType));
  };
  return (
    <div className="mt-[2.5rem]">
      {Object.keys(FilterRadioType)
        .filter((type) => isNaN(FilterRadioType[type]))
        .map((radio, i) => (
          <Radio
            key={radio}
            checked={
              FilterRadioType[filterType].toString() == FilterRadioType[radio]
            }
            name={FilterRadioType[radio]}
            value={FilterRadioType[radio]}
            groupName={`filterRadioType_${group}`}
            onCheckedHandler={onFilterTypeRadioChecked}
          />
        ))}
    </div>
  );
};

export default FilterRadio;
