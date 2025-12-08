import { PRODUCT_ID, UNIT_PRICE } from "./constants";

/** Keep identical payload shape (with item_price) */
export const contentsForPixel = (qty: number) => [
  { id: PRODUCT_ID, quantity: qty, item_price: UNIT_PRICE },
];
export const contentsForCAPI = contentsForPixel;

export const guessCityFromAddress = (address?: string) => {
  if (!address) return "";
  return address.trim().split(/[,\n]/).pop()?.trim().toLowerCase() || "";
};

export const phoneE164BD = (raw?: string) => {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("880")) return `+${digits}`;
  if (digits.startsWith("01")) return `+880${digits}`;
  if (digits.startsWith("1") && digits.length === 10) return `+880${digits}`;
  if (digits.startsWith("88") && digits.length > 2) return `+${digits}`;
  return digits.startsWith("+") ? digits : `+${digits}`;
};

export const splitName = (full?: string) => {
  const parts = (full || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { fn: "", ln: "" };
  if (parts.length === 1) return { fn: parts[0].toLowerCase(), ln: "" };
  return {
    fn: parts.slice(0, -1).join(" ").toLowerCase(),
    ln: parts.at(-1)!.toLowerCase(),
  };
};

export const baseUrl = () =>
  typeof window !== "undefined" ? window.location.href : "";
