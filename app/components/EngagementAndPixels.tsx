// app/components/EngagementAndPixels.tsx
"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import FomoToast from "./FomoToast";

export default function EngagementAndPixels({ children }: PropsWithChildren) {
  const pathname = usePathname() || "";
  const isOrders = pathname.startsWith("/orders");

  if (isOrders) {
    return null;
  }

  return (
    <>
      {children}
      <FomoToast />
    </>
  );
}
