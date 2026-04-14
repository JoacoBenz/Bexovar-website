"use client";

import { usePlausible } from "next-plausible";
import type { Demo } from "@/content/en/demos";
import { VideoEmbed } from "./video-embed";

type DemoPlayEvents = { demo_play: { slug: string; category: string } };

export function DemoCard({ demo }: { demo: Demo }) {
  const plausible = usePlausible<DemoPlayEvents>();
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-lg">
      <VideoEmbed
        title={demo.title}
        poster={demo.poster}
        src={demo.videoSrc}
        onPlay={() =>
          plausible("demo_play", { props: { slug: demo.slug, category: demo.category } })
        }
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between text-xs text-ink-subtle">
          <span className="rounded-full bg-bg-alt px-2 py-0.5 text-ink-muted">
            {demo.category}
          </span>
          <span>{demo.duration}</span>
        </div>
        <h3 className="text-lg font-semibold text-ink">{demo.title}</h3>
        <p className="mt-2 text-sm text-ink-muted">{demo.summary}</p>
      </div>
    </article>
  );
}
