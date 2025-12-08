// app/components/EngagementAndPixels.tsx
"use client";

import { Suspense, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import PageViewTracker from "./PageViewTracker";
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
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <FomoToast />
    </>
  );
}
