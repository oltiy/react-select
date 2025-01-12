export interface Option {
  value?: RawOptionType;
  label: string;
}

export interface FormSelect {
  name: string;
  email: string;
  singleSelect: Option | null;
  multiSelect: Option[] | null;
}

export type RawOptionType = string | number;
