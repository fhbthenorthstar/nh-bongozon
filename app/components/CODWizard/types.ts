export type BundleKey = "course20" | "course40";
export type Bundle = {
  key: BundleKey;
  qty: number;
  discountBDT: number;
  label: string;
  ribbon?: string;
  timing: string;
};

export type TimingChoice = "lt2" | "lt5"| null
export type DurationChoice = "lt3m" | "lt6m" | null;
