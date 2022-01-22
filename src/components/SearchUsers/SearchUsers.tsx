import React from "react";
import { IPaginatedResult } from "../../../pages/types";
import { useAppSelector } from "../../app/hooks";
import { UsersTable } from "../UsersTable";

type SearchUsersProps = {
  paginatedData: IPaginatedResult;
};

const SearchUsers = ({ paginatedData }: SearchUsersProps) => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  return (
    <div className="relative w-full h-full">
      <UsersTable paginatedData={paginatedData} />

      <div
        className={`absolute inset-0 bg-slate-400 transition ease-in-out ${
          isNavigating ? "opacity-50 z-10" : "opacity-0 -z-10"
        }`}
      ></div>
    </div>
  );
};

export default SearchUsers;
