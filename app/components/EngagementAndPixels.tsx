// app/components/EngagementAndPixels.tsx
"use client";

import { PropsWithChildren, Suspense } from "react";
import { usePathname } from "next/navigation";
import FomoToast from "./FomoToast";
import TikTokPageView from "./TikTokPageView";

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
        <TikTokPageView />
      </Suspense>
      <FomoToast />
    </>
  );
}
