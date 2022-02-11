import React from "react";

type DynamicPropertyProps = {
  value: string;
};
const DynamicProperty = ({ value }: DynamicPropertyProps) => {
  return (
    <div className="flex justify-between  items-center gap-4">
      {/* <DynamicLabel value={value.split("_")[1]} />
      <span className="text-slate-800">{value.split("_")[0]}</span> */}
    </div>
  );
};

export default DynamicProperty;
