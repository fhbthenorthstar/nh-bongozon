// app/lib/fbpixelInitOnce.ts
let inited = false;

type AdvancedMatching = Record<string, string | undefined>;
type FBQCommand = (command: string, ...args: unknown[]) => void;

/** Initialize Facebook Pixel exactly once (safe guard). */
export function fbqInitOnce(pixelId?: string, am?: AdvancedMatching) {
  if (!pixelId || inited) return;
  try {
    // Read fbq from the global object without declaring Window again
    const fbq = (globalThis as unknown as { fbq?: FBQCommand }).fbq;
    fbq?.("init", pixelId, am ?? {});
    inited = true;
  } catch {
    // ignore
  }
}
