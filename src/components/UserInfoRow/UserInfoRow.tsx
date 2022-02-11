import React from "react";
import { formatTitle } from "../../utils/string";

type UserInfoRowProps = {
  propertyName: string;
  // propertyValue: { __typename: string; value: string | number | Date };
  additionalValue?: string;
  children: React.ReactNode;
};

const UserInfoRow: React.FC<UserInfoRowProps> = ({
  propertyName,
  children,
}) => {
  return (
    <div className="flex justify-between py-2">
      <span className="text-slate-400">{formatTitle(propertyName)}</span>
      <div>{children}</div>
    </div>
  );
};

export default React.memo(UserInfoRow);
