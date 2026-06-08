import Image from "next/image";
import { cn } from "@/lib/utils";
import { resolveImage } from "@/lib/images";
import { Icon } from "./icon";

/* Media — khối ảnh tái dùng, SWAPPABLE.
   - Có `src` (key ảnh hoặc URL) tra ra ảnh thật → render <next/image fill> (tối ưu: lazy, sizes, WebP).
   - KHÔNG resolve được → fallback hộp xám placeholder (giữ hành vi cũ).

   ⚠️ ẢNH DEMO (Unsplash) — PRODUCTION = ẢNH KHÁCH CUNG CẤP (DECISIONS #4).
   Ảnh gắn qua fixtures (src/lib/mock/*) + map src/lib/images.ts, KHÔNG hardcode rải rác. */
export function Media({
  src,
  label,
  alt,
  ratio = 16 / 9,
  icon = "ImageOff",
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
}: {
  /** Key ảnh trong fixtures (vd "ccn/hung-nhan/hero") hoặc URL. Cũ: chỉ có `label`. */
  src?: string;
  /** Nhãn (placeholder hiện text này; cũng dùng làm alt nếu thiếu `alt`). */
  label?: string;
  /** Mô tả ảnh cho a11y (LocalizedText đã resolve). */
  alt?: string;
  ratio?: number;
  icon?: string;
  className?: string;
  /** next/image sizes — chỉnh theo layout để tối ưu băng thông. */
  sizes?: string;
  /** Ưu tiên tải (LCP, vd hero) — tắt lazy. */
  priority?: boolean;
}) {
  const resolved = resolveImage(src);

  // Có ảnh thật → next/image fill trong khung tỉ lệ cố định (không layout shift).
  if (resolved) {
    return (
      <div
        className={cn("relative w-full overflow-hidden bg-muted", className)}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={resolved}
          alt={alt ?? label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  // Fallback: hộp xám placeholder (ảnh khách chưa cấp / key chưa map).
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
