"use client";

export default function Stepper({ current }: { current: 1 | 2 }) {
  const steps = [
    { id: 1 as const, title: "কোর্স" },
    { id: 2 as const, title: "ডেলিভারি" },
  ];
  return (
    <div className="flex items-center justify-center gap-6">
      {steps.map((s, i) => {
        const done = current > s.id;
        const active = current === s.id;
        return (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold sm:h-8 sm:w-8 sm:text-sm ${
                active
                  ? "text-neutral-900 bg-gradient-to-b from-[#8AE233] to-[#66C214]"
                  : done
                  ? "bg-white/80 text-neutral-800"
                  : "bg-white/20 text-white/70"
              }`}
            >
              {done ? "✓" : s.id}
            </div>
            <div className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-white/80 sm:text-[11px]">
              {s.title}
            </div>
            {i < steps.length - 1 && (
              <div className="ml-3 h-[2px] w-16 rounded bg-white/15" />
            )}
          </div>
        );
      })}
    </div>
  );
}
