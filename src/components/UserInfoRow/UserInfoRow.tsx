import React from "react";

type UserInfoRowProps = {
  propertyName: string;
  propertyValue: string;
};
const UserInfoRow = ({ propertyName, propertyValue }: UserInfoRowProps) => {
  return (
    <div className="flex justify-between">
      <span>{propertyName}</span>
      <span>{propertyValue}</span>
    </div>
  );
};

export default UserInfoRow;
