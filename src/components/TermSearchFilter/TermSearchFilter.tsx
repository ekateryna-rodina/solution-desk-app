import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TermSearchFilterType } from "../../constants";
import { setCurrentTermSearchFilterType } from "../../features/filter/filter-slice";
import { Radio } from "../Radio";

const TermSearchFilter = ({ group }: { group: string }) => {
  const {
    current: { termSearchFilterType },
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const onTermSearchFilterTypeRadioChecked = (type: TermSearchFilterType) => {
    dispatch(setCurrentTermSearchFilterType(type));
  };
  return (
    <div className="mt-[2.5rem]">
      {Object.keys(TermSearchFilterType)
        .filter((type) => isNaN(TermSearchFilterType[type]))
        .map((radio, i) => (
          <Radio
            key={radio}
            checked={
              TermSearchFilterType[termSearchFilterType].toString() ==
              TermSearchFilterType[radio]
            }
            name={TermSearchFilterType[radio]}
            value={TermSearchFilterType[radio]}
            groupName={`filterRadioType_${group}`}
            onCheckedHandler={onTermSearchFilterTypeRadioChecked}
          />
        ))}
    </div>
  );
};

export default TermSearchFilter;
