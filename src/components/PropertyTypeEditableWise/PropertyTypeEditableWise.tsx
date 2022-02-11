import React from "react";
import { formatDate } from "../../utils/string";
import { DynamicProperty } from "../DynamicProperty";
import SendMailIcon from "../icons/SendMailIcon";
import { Rewards } from "../Rewards";

type PropertyTypeEditableWiseProps = {
  property: {
    __typename: string;
    value: string | number | Date;
  };
};
const PropertyTypeEditableWise = ({
  property,
}: PropertyTypeEditableWiseProps) => {
  let { value } = property;
  const render = () => {
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
    return dataTypeMap[property.__typename]();
  };
  return <>{render()}</>;
};

export default PropertyTypeEditableWise;
