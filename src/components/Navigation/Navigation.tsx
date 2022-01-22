import React from "react";
import { useAppSelector } from "../../app/hooks";
import { ToggleButton } from "../ToggleButton";

const Navigation = () => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  return (
    <nav
      className={`fixed top-0 left-0 bottom-0 bg-blueExtend w-full sm:w-1/6 md:w-1/6 lg:w-1/6 h-6/8 transition ease-in-out ${
        isNavigating ? "transform-none" : "-translate-x-full"
      }`}
    >
      <div className="relative">
        <ul className="mt-16 p-8 text-white">
          <li>Tickets</li>
          <li>Users</li>
          <li>Analytics</li>
        </ul>
        <div
          className={`absolute right-0 top-0 transition ease-in-out ${
            !isNavigating ? "translate-x-full" : "transform-none"
          }`}
        >
          <ToggleButton />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
