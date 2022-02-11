export enum ResponseRate {
  Low,
  Medium,
  High,
}
export enum CustomerService {
  Low,
  Medium,
  High,
}

export enum TermSearchFilterType {
  Is,
  Not,
  Contains,
}

export enum Direction {
  Up,
  Down,
  Undefined,
}

export enum Order {
  Ascending = 1,
  Descending = -1,
}

export enum Column {
  Name = "name",
  Email = "email",
  CustomerService = "CustomerService",
  ResponseRate = "responseRate",
  City = "city",
  Country = "country",
  Department = "department",
  Dob = "dob",
  Medals = "medals",
  CustomerServiceDynamic = "customerServiceDynamic",
  InProgress = "inProgress",
  ResponseRateDynamic = "responseRateDynamic",
  Average = "average",
  Experience = "experience",
  CustomerServiceWithDynamic = "customerServiceWithDynamic",
  ResponseRateWithDynamic = "responseRateWithDynamic",
  Employed = "employed",
}

export type StringAsColumn = keyof typeof Column;

export const LevelPropertiesMap = {
  customerService: {
    low: [0, 1.7],
    medium: [1.8, 3.4],
    high: [3.5, 5],
  },
  responseRate: {
    low: [0, 34],
    medium: [35, 75],
    high: [76, 100],
  },
};

export const TermSearchFilterStringsMap = {
  [TermSearchFilterType.Is]: "is",
  [TermSearchFilterType.Not]: "is not",
  [TermSearchFilterType.Contains]: "includes",
};

export const PersonalInformationStructure = {
  PersonalInformation: ["username", "dob", "gender", "employed", "experience"],
  Productivity: [
    "responseRateWithDynamic",
    "customerServiceWithDynamic",
    "inProgress",
    "average",
    "medals",
  ],
  Contacts: ["phone", "email", "ipAddress", "country", "city"],
};

export const SortingColumns = {
  name: "lastName",
};
