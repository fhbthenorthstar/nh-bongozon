import type { Bundle, TimingChoice, DurationChoice } from "./types";

export function choicesFromBundle(
  b: Bundle
): {
  timingChoice: TimingChoice;
  durationChoice: DurationChoice;
  timingText: string;
  durationText?: string;
  recommendedLabel: string;
} {
  switch (b.key) {
    case "course20":
      return {
        timingChoice: "lt5",
        durationChoice: null,
        timingText: "৫ মিনিটের কম",
        recommendedLabel: b.label,
      };
    case "course40":
      return {
        timingChoice: "lt2",
        durationChoice: "lt3m",
        timingText: "২ মিনিটের কম",
        durationText: "৩ মাসের কম",
        recommendedLabel: b.label,
      };
    default:
      return {
        timingChoice: "lt5",
        durationChoice: null,
        timingText: "৫ মিনিটের কম",
        recommendedLabel: b.label,
      };
  }
}
