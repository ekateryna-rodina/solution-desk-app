import React from "react";
import { useAppSelector } from "../../app/hooks";
import { formatTitle } from "../../utils/string";

type UserInfoRowProps = {
  propertyName: string;
  isEditable: boolean;
  additionalValue?: string;
  children: React.ReactNode;
};

const UserInfoRow: React.FC<UserInfoRowProps> = ({
  propertyName,
  isEditable,
  children,
}) => {
  const { isEditMode } = useAppSelector((state) => state.userInfo);
  return (
    <div className="flex justify-between py-2">
      <span
        className={
          !isEditMode || isEditable ? "text-slate-600" : "text-slate-400"
        }
      >
        {formatTitle(propertyName)}
      </span>
      <div>{children}</div>
    </div>
  );
};

export default React.memo(UserInfoRow);
