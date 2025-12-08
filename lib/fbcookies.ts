// app/lib/fbcookies.ts
export function readFBP(): string | undefined {
  try {
    return document.cookie
      .split("; ")
      .find(c => c.startsWith("_fbp="))
      ?.split("=")[1];
  } catch {
    return undefined;
  }
}

export function readFBC(): string | undefined {
  try {
    return document.cookie
      .split("; ")
      .find(c => c.startsWith("_fbc="))
      ?.split("=")[1];
  } catch {
    return undefined;
  }
}
