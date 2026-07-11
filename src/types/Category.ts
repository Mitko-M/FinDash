export type CategoryType =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "HealthCare"
  | "Education"
  | "Other"
  | "Income";

export type CategorySlice = {
  value: number;
  color: string;
  gradientCenterColor: string;
  label: string;
  percent: number;
};
