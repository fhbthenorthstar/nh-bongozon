// components/ViolentFeatures.tsx
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function ViolentFeatures({ src, alt = "", priority }: Props) {
  return (
    <section
      className="
        relative isolate w-full overflow-hidden
        bg-white md:bg-[#111214]
      "
    >
      {/* desktop-only gradient glows (same style you shared) */}
      <div className="pointer-events-none absolute -top-[18vw] left-1/2 h-[45vw] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/18 via-emerald-400/10 to-transparent blur-3xl hidden md:block" />
      <div className="pointer-events-none absolute -bottom-[22vw] right-1/2 h-[40vw] w-[110vw] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl hidden md:block" />

      {/* Mobile: full-bleed, unchanged */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen md:hidden">
        <div className="mx-auto w-full">
          <Image
            src={src}
            alt={alt}
            width={2000}
            height={1200}
            sizes="100vw"
            priority={priority}
            className="w-full h-auto select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Desktop: centered, bounded to max-w-3xl */}
      <div className="relative hidden md:block">
        <div className="mx-auto w-full max-w-3xl px-4">
          <Image
            src={src}
            alt={alt}
            width={2000}
            height={1200}
            sizes="(min-width: 768px) 48rem, 100vw"
            priority={priority}
            className="w-full h-auto select-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
