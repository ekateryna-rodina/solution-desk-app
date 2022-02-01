import {
  CustomerService,
  ResponseRate,
  TermSearchFilterType,
} from "../../constants";

export interface IUser {
  id: number;
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
}

export type IUserPost = Omit<
  IUser,
  | "id"
  | "customerService"
  | "responseRate"
  | "average"
  | "medals"
  | "customerServiceDynamic"
  | "inProgress"
  | "responseRateDynamic"
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
