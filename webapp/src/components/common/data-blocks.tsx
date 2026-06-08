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
          {/* break-words + leading-tight: giá trị dài (vd "3 trường (bán kính 10 km)") không tràn ô ở mobile */}
          <dd className="text-xl font-semibold leading-tight tracking-tight text-balance break-words sm:text-2xl">{s.value}</dd>
          <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/* Cặp key→value NGẮN (vd "Diện tích · 50 ha"). `layout`:
   - "inline"  (mặc định): nhãn trái · giá trị phải, cùng baseline — cho thông số ngắn.
   - "stacked": nhãn trên · giá trị dưới, canh trái — cho giá trị dài/nhiều chữ (vd hồ sơ tuyển dụng).
   Với nội dung tên+mô tả (giá trị là 1 câu) → dùng <DescriptionList> thay vì block này. */
export function DefinitionList({
  items,
  columns = 2,
  layout = "inline",
}: {
  items: { label: string; value: string }[];
  columns?: number;
  layout?: "inline" | "stacked";
}) {
  if (!items.length) return null;

  if (layout === "stacked") {
    return (
      <dl className={cn("grid gap-x-8 gap-y-4", gridColsClass[columns])}>
        {items.map((d, i) => (
          <div key={i} className="border-b border-border pb-2.5">
            <dt className="text-sm text-muted-foreground">{d.label}</dt>
            <dd className="mt-0.5 font-medium break-words">{d.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={cn("grid gap-x-8 gap-y-3", gridColsClass[columns])}>
      {items.map((d, i) => (
        <div key={i} className="flex items-baseline justify-between gap-4 border-b border-border pb-2 text-sm">
          <dt className="min-w-0 text-muted-foreground">{d.label}</dt>
          <dd className="min-w-0 break-words text-right font-medium">{d.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Danh sách "tên + mô tả": tên nổi bật trên · mô tả phụ dưới, canh trái, gạch ngang đầu mục.
   Dùng cho giá trị cốt lõi, phân khu quy hoạch… (giá trị là cụm/câu, KHÔNG hợp justify-between). */
export function DescriptionList({
  items,
  columns = 3,
}: {
  items: { label: string; value: string }[];
  columns?: number;
}) {
  if (!items.length) return null;
  return (
    <dl className={cn("grid gap-x-8 gap-y-6", gridColsClass[columns])}>
      {items.map((d, i) => (
        <div key={i} className="border-t border-border pt-4">
          <dt className="font-medium leading-snug text-balance">{d.label}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.value}</dd>
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
    <div className={cn("grid items-stretch gap-4", gridColsClass[columns])}>
      {items.map((f, i) => (
        <div key={i} className="flex h-full gap-3 border border-border p-4">
          <Icon name={f.icon} className="mt-0.5 size-5 shrink-0" />
          <div className="min-w-0 space-y-1">
            <p className="font-medium leading-tight text-balance break-words">{f.title}</p>
            {f.desc ? <p className="text-sm text-muted-foreground break-words">{f.desc}</p> : null}
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
        // h-auto + whitespace-normal: tag nhiều chữ (vd "Chế biến nông sản") xuống dòng thay vì bị cắt
        <Badge key={i} variant={t.variant ?? "secondary"} className="h-auto max-w-full whitespace-normal py-1 text-left">
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
