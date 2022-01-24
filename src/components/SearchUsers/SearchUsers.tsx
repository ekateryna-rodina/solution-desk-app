import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Filters } from "../Filters";
import { UsersTable } from "../UsersTable";

const SearchUsers = () => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  return (
    <div className="relative w-full h-full">
      <Filters />
      <UsersTable />
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-slate-400 transition ease-in-out ${
          isNavigating ? "opacity-50 z-0" : "opacity-0 -z-10"
        }`}
      ></div>
    </div>
  );
};

export default SearchUsers;
