import React from "react";
import { useAppSelector } from "../../app/hooks";
import { PersonalInformationStructure } from "../../constants";
import { User } from "../../types";
import { formatTitle } from "../../utils/string";
import { PropertyTypeEditableWise } from "../PropertyTypeEditableWise";
import { UserInfoImage } from "../UserInfoImage";
import { UserInfoRow } from "../UserInfoRow";

const UserInfoEdit = () => {
  const { current: user } = useAppSelector((state) => state.userInfo);
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-3 justify-center items-center py-2">
        <UserInfoImage avatar={user.avatar.value as string} />
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{user.name.value}</span>
          <span className="text-slate-400 text-sm">
            {user.characteristic.value}
          </span>
          <span className="text-slate-400 text-sm">
            {user.department.value} Department
          </span>
        </div>
      </div>
      {Object.keys(PersonalInformationStructure).map((title) => (
        <div className="grid grid-rows-6 gap-2 px-4 py-8" key={title}>
          <div className=" font-bold text-slate-400">{formatTitle(title)}</div>
          {PersonalInformationStructure[title].map((attr: keyof User) => (
            <UserInfoRow
              isEditable={user[attr].isEditable}
              propertyName={attr}
              key={attr}
            >
              <PropertyTypeEditableWise
                property={{ ...user[attr], name: attr }}
              />
            </UserInfoRow>
          ))}
        </div>
      ))}
    </>
  );
};

export default UserInfoEdit;
