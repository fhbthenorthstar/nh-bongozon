// app/lib/buildOrderPayload.ts
export type BuildOrderArgs = {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;

  timingChoice: "lt2" | "lt5" | "lt10" | "tryonly";
  durationChoice?: "lt3m" | "lt6m" | "gt1y" | null;

  selectedKey: "course20" | "course40" | "course60";
  recommendedKey: "course20" | "course40" | "course60";

  unitPrice: number;
  quantity: number;
  bundlePrice: number;
  basePrice: number;
  cmpPrice: number;
  currency: string;

  creativeId?: string | null;

  // exact, human strings
  timingText: string;
  durationText?: string;
  selectedLabel: string;
  recommendedLabel: string;

  createdAt?: string;

  // NEW
  pathaoRating?: string | null;
};

export function buildOrderPayload(a: BuildOrderArgs) {
  const at = a.createdAt || new Date().toISOString();

  return {
    customerName: a.customerName,
    customerPhone: a.customerPhone,
    deliveryAddress: a.deliveryAddress,

    timingChoice: a.timingChoice,
    durationChoice: a.durationChoice ?? null,

    selectedKey: a.selectedKey,
    recommendedKey: a.recommendedKey,

    product: { quantity: a.quantity },
    pricing: {
      unitPrice: a.unitPrice,
      basePrice: a.basePrice,
      bundlePrice: a.bundlePrice,
      cmpPrice: a.cmpPrice,
      currency: a.currency,
    },

    creativeId: a.creativeId ?? null,

    // NEW: Pathao rating snapshot
    pathaoRating: a.pathaoRating ?? null,

    // exact, human timeline items
    timeline: [
      { at, key: "placed",   text: "অর্ডার করেছেন" },
      { at, key: "timing",   text: `বর্তমান টাইমিং: ${a.timingText}` },
      ...(a.durationText ? [{ at, key: "duration", text: `বিগত: ${a.durationText}` }] : []),
      { at, key: "selected", text: `বেছে নিয়েছে: ${a.selectedLabel}` },
      { at, key: "reco",     text: `রেকোমেন্ডেড : ${a.recommendedLabel}` },
    ],
  };
}
