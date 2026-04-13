"use client";

import { useState } from "react";

export function VideoEmbed({
  title,
  poster,
  src,
  onPlay,
}: {
  title: string;
  poster: string;
  src?: string;
  onPlay?: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const hasSrc = Boolean(src);

  if (playing && src) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md bg-black">
        <video
          data-testid="video-el"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-bg-alt">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={`${title} poster`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <button
        type="button"
        disabled={!hasSrc}
        onClick={() => {
          if (!hasSrc) return;
          setPlaying(true);
          onPlay?.();
        }}
        aria-label={`Play ${title} video`}
        className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-ink shadow-md"
        >
          ▶
        </span>
      </button>
    </div>
  );
}
