import { cn } from "@/lib/cn";

export function OrbitalGraphic({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn("relative w-[320px] h-[320px] mx-auto", className)}
    >
      <div
        data-orbit-ring
        className="absolute inset-0 rounded-full border border-accent/30 animate-[spin_18s_linear_infinite]"
      />
      <div
        data-orbit-ring
        className="absolute inset-8 rounded-full border border-accent/25 animate-[spin_12s_linear_infinite_reverse]"
      />
      <div
        data-orbit-ring
        className="absolute inset-16 rounded-full border border-accent/20 animate-[spin_8s_linear_infinite]"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-hover shadow-lg opacity-80" />
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(2,132,199,0.6)]" />
      <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-accent/80" />
      <div className="absolute top-1/2 left-4 w-2.5 h-2.5 rounded-full bg-accent/70" />
    </div>
  );
}
