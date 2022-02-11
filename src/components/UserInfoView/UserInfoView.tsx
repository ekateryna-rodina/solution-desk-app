import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { PersonalInformationStructure } from "../../constants";
import { enableEditMode } from "../../features/userInfo/userInfo-slice";
import { TypeWithDiscriminator, User } from "../../types";
import { formatDate, formatTitle } from "../../utils/string";
import { DynamicProperty } from "../DynamicProperty";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import SendMailIcon from "../icons/SendMailIcon";
import { Rewards } from "../Rewards";
import { UserInfoImage } from "../UserInfoImage";
import { UserInfoRow } from "../UserInfoRow";

type UserInfoViewProps = {
  user: TypeWithDiscriminator<User>;
};

const UserInfoView = ({ user }: UserInfoViewProps) => {
  const dispatch = useAppDispatch();
  const renderChildDataTypeWise = (propertyValue: {
    __typename: string;
    value: string | number | Date;
  }) => {
    let { value } = propertyValue;
    const dataTypeMap = {
      date: () => (
        <span className="text-slate-800">
          {formatDate(value as string | Date)}
        </span>
      ),
      email: () => (
        <a href={`mailto:${value}?subject=Important!&body=Hi.`} target="_blank">
          <SendMailIcon fill={"fill-blueExtend/50"} />
        </a>
      ),
      dynamic: () => <DynamicProperty value={value as string} />,
      multipleIcons: () => <Rewards count={+value} />,
      string: () => <span className="text-slate-800">{value}</span>,
      number: () => <span className="text-slate-800">{value}</span>,
    };
    return dataTypeMap[propertyValue.__typename]();
  };
  const onEditModeHandler = () => {
    dispatch(enableEditMode());
  };
  return (
    <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 justify-center items-center">
      <div className="grid grid-cols-1 grid-rows-3 justify-center items-center py-2">
        <div className="absolute top-4 left-0">
          <div className="flex flex-row justify-start items-center gap-2 px-4">
            <button onClick={onEditModeHandler}>
              <EditIcon stroke={"stroke-blueExtend/50"} />
            </button>
            <button>
              <DeleteIcon fill={"fill-blueExtend/50"} />
            </button>
          </div>
        </div>
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
              propertyName={attr}
              // propertyValue={user[attr]}
              key={attr}
            >
              {renderChildDataTypeWise(user[attr])}
            </UserInfoRow>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserInfoView;
