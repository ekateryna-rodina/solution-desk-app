import React from "react";
import { IPaginatedResult } from "../../../pages/types";
import { UsersTable } from "../UsersTable";

type SearchUsersProps = {
  paginatedData: IPaginatedResult;
};

const SearchUsers = ({ paginatedData }: SearchUsersProps) => {
  return (
    <div>
      <UsersTable paginatedData={paginatedData} />
    </div>
  );
};

export default SearchUsers;
