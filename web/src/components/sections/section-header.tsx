import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-eyebrow uppercase text-accent mb-3">{eyebrow}</p>
      )}
      <h2 className="text-h2 text-ink">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-muted max-w-2xl">{subtitle}</p>}
    </div>
  );
}
