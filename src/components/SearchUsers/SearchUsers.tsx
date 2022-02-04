import React from "react";
import { AddNewButton } from "../AddNewButton";
import { Filters } from "../Filters";
import { UsersTable } from "../UsersTable";

const SearchUsers = () => {
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-row justify-between">
        <div className="relative flex flex-row justify-start items-start gap-4 mx-12 mb-4z-100">
          <h1 className="text-slate-700 text-lg font-bold">Employees</h1>
          <AddNewButton />
        </div>
        <Filters />
      </div>
      <UsersTable />
    </div>
  );
};

export default SearchUsers;
