import { cn } from "@/lib/utils";
import { Icon } from "./icon";

/* Placeholder ảnh — "ảnh khách cung cấp" (DECISIONS #4). Hộp xám tỉ lệ cố định,
   hiện nhãn + icon. Khi có ảnh thật → thay bằng next/image, giữ nguyên API. */
export function Media({
  label,
  ratio = 16 / 9,
  icon = "ImageOff",
  className,
}: {
  label?: string;
  ratio?: number;
  icon?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 border border-dashed border-border bg-muted text-muted-foreground",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <Icon name={icon} className="size-6 opacity-60" />
      {label ? <span className="px-3 text-center text-xs">{label}</span> : null}
    </div>
  );
}
