import {
  CustomerService,
  ResponseRate,
  TermSearchFilterType,
} from "../../constants";

export type User = {
  _id: string;
  id: number;
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
  employed: Date;
  phone: string;
};

export type UserPost = Omit<
  User,
  | "id"
  | "_id"
  | "name"
  | "customerService"
  | "responseRate"
  | "average"
  | "medals"
  | "customerServiceDynamic"
  | "inProgress"
  | "responseRateDynamic"
  | "experience"
  | "customerServiceWithDynamic"
  | "responseRateWithDynamic"
>;

export type IFilterProperties = {
  gender: [];
  city: [];
  country: [];
  responseRate: Array<keyof typeof ResponseRate>;
  customerService: Array<keyof typeof CustomerService>;
};

export interface IFilterApplied {
  property: keyof IFilterProperties;
  term?: string;
  termSearchFilterType?: TermSearchFilterType | number;
  level?: "low" | "medium" | "high";
}
