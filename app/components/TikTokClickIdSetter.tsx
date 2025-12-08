// app/components/TikTokClickIdSetter.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Sets a cookie that expires in 30 days
function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // Use Lax mode for modern browser compatibility; secure in production
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax" + secure;
}

export default function TikTokClickIdSetter() {
  const searchParams = useSearchParams();
  const ttclid = searchParams.get("ttclid");

  useEffect(() => {
    if (ttclid) {
      // Set the ttclid in a cookie so it can be accessed by server-side events on subsequent requests.
      // This is crucial for the Conversions API.
      setCookie("ttclid", ttclid, 30); // Persist for 30 days
    }
  }, [ttclid]);

  return null; // This component renders nothing
}