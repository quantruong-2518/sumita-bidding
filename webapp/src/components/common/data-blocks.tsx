import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { gridColsClass } from "./grid";

/* Các khối hiển thị dữ liệu thuần (string đã resolve sẵn) — tái dùng nhiều màn. */

export function StatList({ items, columns = 4 }: { items: { label: string; value: string }[]; columns?: number }) {
  if (!items.length) return null;
  return (
    <dl className={cn("grid gap-px overflow-hidden border border-border bg-border", gridColsClass[columns])}>
      {items.map((s, i) => (
        <div key={i} className="bg-background p-4">
          <dd className="text-2xl font-semibold tracking-tight">{s.value}</dd>
          <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export function DefinitionList({ items, columns = 2 }: { items: { label: string; value: string }[]; columns?: number }) {
  if (!items.length) return null;
  return (
    <dl className={cn("grid gap-x-8 gap-y-3", gridColsClass[columns])}>
      {items.map((d, i) => (
        <div key={i} className="flex justify-between gap-4 border-b border-border pb-2 text-sm">
          <dt className="text-muted-foreground">{d.label}</dt>
          <dd className="text-right font-medium">{d.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function IconFeatureGrid({
  items,
  columns = 3,
}: {
  items: { icon: string; title: string; desc?: string }[];
  columns?: number;
}) {
  if (!items.length) return null;
  return (
    <div className={cn("grid gap-4", gridColsClass[columns])}>
      {items.map((f, i) => (
        <div key={i} className="flex gap-3 border border-border p-4">
          <Icon name={f.icon} className="mt-0.5 size-5 shrink-0" />
          <div className="space-y-1">
            <p className="font-medium leading-tight">{f.title}</p>
            {f.desc ? <p className="text-sm text-muted-foreground">{f.desc}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

type TagVariant = "default" | "secondary" | "outline" | "destructive";
export function TagList({ items }: { items: { label: string; variant?: TagVariant }[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <Badge key={i} variant={t.variant ?? "secondary"}>
          {t.label}
        </Badge>
      ))}
    </div>
  );
}

export function Timeline({ items }: { items: { date: string; label: string; done?: boolean }[] }) {
  if (!items.length) return null;
  return (
    <ol className="space-y-4 border-l border-border pl-6">
      {items.map((m, i) => (
        <li key={i} className="relative">
          <span
            className={cn(
              "absolute -left-[31px] flex size-4 items-center justify-center border bg-background",
              m.done ? "border-foreground" : "border-border",
            )}
          >
            <Icon name={m.done ? "Check" : "Clock"} className={cn("size-3", !m.done && "text-muted-foreground")} />
          </span>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.date}</p>
          <p className="font-medium">{m.label}</p>
        </li>
      ))}
    </ol>
  );
}

export function RichText({ content, className }: { content: string; className?: string }) {
  const paras = content.split("\n").map((p) => p.trim()).filter(Boolean);
  return (
    <div className={cn("space-y-3 leading-relaxed text-foreground/90", className)}>
      {paras.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
