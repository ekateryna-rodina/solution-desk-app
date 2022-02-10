import {
  CustomerService,
  ResponseRate,
  TermSearchFilterType,
} from "../../constants";

export type User = {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ipAddress: string;
  avatar: string;
  username: string;
  customerService: number;
  responseRate: number;
  address: string;
  city: string;
  country: string;
  characteristic: string;
  department: string;
  dob: Date;
  medals: number;
  customerServiceDynamic: string;
  inProgress: number;
  responseRateDynamic: string;
  average: number;
  experience: number;
  customerServiceWithDynamic: string;
  responseRateWithDynamic: string;
  employed: DateType;
  phone: string;
};

export type DateType = {
  __typename: "date";
  value: Date;
};

export type IFilterProperties = {
  gender: [];
  city: [];
  country: [];
  department: [];
  responseRate: Array<keyof typeof ResponseRate>;
  customerService: Array<keyof typeof CustomerService>;
};

export interface IFilterApplied {
  property: keyof IFilterProperties;
  term?: string;
  termSearchFilterType?: TermSearchFilterType | number;
  level?: "low" | "medium" | "high";
}
