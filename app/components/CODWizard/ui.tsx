"use client";

export function Spinner({
  className = "",
  size = "sm",
  tone = "dark",
}: {
  className?: string;
  size?: "xs" | "sm" | "md";
  tone?: "dark" | "light";
}) {
  const s =
    size === "xs" ? "h-3.5 w-3.5" : size === "md" ? "h-5 w-5" : "h-4 w-4";
  const c =
    tone === "dark"
      ? "border-neutral-900/30 border-t-neutral-900"
      : "border-white/30 border-t-white";
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block ${s} animate-spin rounded-full border-[2px] ${c} ${className}`}
    />
  );
}

export function BtnContent({
  loading,
  label,
  tone = "dark",
}: {
  loading: boolean;
  label: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className="inline-flex items-center gap-2">
      {loading ? <Spinner tone={tone} /> : <span>{label}</span>}
    </span>
  );
}
