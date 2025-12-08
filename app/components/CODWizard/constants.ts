import type { Bundle } from "./types";

export const UNIT_PRICE = 1290 as const; // ৳
export const PRODUCT_ID = "night-horse-500g";
export const PRODUCT_NAME = "Night Horse";
export const PRODUCT_CATEGORY = "Herbal Food Supplements";
export const TT_PRODUCT_CATEGORY = "Beauty & Personal Care";
export const CURRENCY = "BDT";

export const BUNDLES: Bundle[] = [
  {
    key: "course20",
    qty: 1,
    discountBDT: 0,
    label: "৫০০ গ্রাম (২০ দিনের প্ল্যান)",
    timing: "দুর্বলতা যদি ৬ মাসের কম হয়",
  },
  {
    key: "course40",
    qty: 2,
    discountBDT: 380,
    label: "১০০০ গ্রাম (৪০ দিনের প্ল্যান)",
    ribbon: "সর্বাধিক কার্যকর ও জনপ্রিয়",
    timing: "দুর্বলতা যদি ১ বসরের বেশি হয়",
  }
];

export const fmtBDT = (n: number) =>
  `৳${Math.round(n).toLocaleString("bn-BD")}`;
export const compareAt = (price: number) => Math.round(price * 1.15);
export const bnNumber = (n: number) => n.toLocaleString("bn-BD");
