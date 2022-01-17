import React from "react";
import { useAppSelector } from "../../app/hooks";
import LogoIcon from "../icons/LogoIcon";

const Logo = () => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  return (
    <div className="flex justify-between items-center">
      <div>
        <LogoIcon fill={isNavigating ? "fill-white" : "fill-blueExtend"} />
      </div>
      <h1
        className={`ml-2 hidden sm:block md:block lg:block ${
          isNavigating ? "text-white" : "text-blueExtend"
        }`}
      >
        SolutionDesk
      </h1>
    </div>
  );
};

export default Logo;
