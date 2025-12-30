"use client";

import type { ComponentProps } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "../lib/ui/cn";

const DEFAULT_PLAYBACK_ID = "ev3gkLZqhqKJyN9ND6wYDFRt9TLy1rU7vZXB8GaO0274";
const DEFAULT_METADATA = {
  video_id: "night-horse-landing",
  video_title: "Night Horse Landing Video",
  viewer_user_id: "anonymous",
};

type MuxVideoProps = {
  playbackId?: string;
  poster?: string;
  aspectRatio?: number | string;
  className?: string;
  containerClassName?: string;
  playerClassName?: string;
  metadata?: ComponentProps<typeof MuxPlayer>["metadata"];
  playerProps?: Omit<
    ComponentProps<typeof MuxPlayer>,
    "playbackId" | "metadata" | "className" | "poster"
  >;
};

export default function MuxVideo({
  playbackId = DEFAULT_PLAYBACK_ID,
  poster,
  aspectRatio = 1,
  className,
  containerClassName,
  playerClassName,
  metadata = DEFAULT_METADATA,
  playerProps,
}: MuxVideoProps) {
  return (
    <section className={cn("w-full", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-3xl py-6",
          containerClassName
        )}
      >
        <div
          className="relative w-full overflow-hidden rounded-md"
          style={{ aspectRatio }}
        >
          <MuxPlayer
            playbackId={playbackId}
            className={cn("absolute inset-0 h-full w-full", playerClassName)}
            metadata={metadata}
            poster={poster}
            {...playerProps}
          />
        </div>
      </div>
    </section>
  );
}
