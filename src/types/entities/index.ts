import {
  CustomerService,
  ResponseRate,
  TermSearchFilterType,
} from "../../constants";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  avatar: string;
  username: string;
  customerService: number;
  responseRate: number;
  address: string;
  city: string;
  country: string;
}

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
