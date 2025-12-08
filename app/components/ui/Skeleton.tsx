"use client";

import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("skel rounded-lg", className)} />;
}

/** rounded card placeholder */
export function CardSkeleton({ className }: { className?: string }) {
  return <div className={clsx("skel rounded-2xl border border-white/10 ring-1 ring-white/10", className)} />;
}
