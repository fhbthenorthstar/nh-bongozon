"use client";

import { useState } from "react";

export default function LogoutButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (busy) return;
    setBusy(true);
    // Try a few common endpoints; degrade gracefully
    try {
      await fetch("/api/logout", { method: "POST" }).catch(() => {});
    } finally {
      // Redirect to a safe page (adjust if you have NextAuth)
      window.location.href = "/login";
    }
  };

  return (
    <button onClick={onClick} className={className} disabled={busy} aria-busy={busy}>
      {children}
    </button>
  );
}
