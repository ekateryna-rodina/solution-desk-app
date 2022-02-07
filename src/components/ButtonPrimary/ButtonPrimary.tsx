import React from "react";

type ButtonPrimaryProps = {
  handler: () => void;
  label: string;
};
const ButtonPrimary = ({ handler, label }: ButtonPrimaryProps) => {
  return (
    <button
      className="py-1 px-2 rounded bg-blueExtend text-white hover:bg-blueExtend/80 border-bg-blueExtend transition ease-out shadow-md"
      onClick={handler}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
