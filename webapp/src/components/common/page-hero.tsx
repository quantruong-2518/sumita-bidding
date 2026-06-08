import Image from "next/image";
import { Container } from "./section";
import { resolveImage } from "@/lib/images";

/* Hero tái dùng (trang chủ + chi tiết CCN).
   - `image` = key ảnh (fixtures) hoặc URL → render ảnh nền thật + phủ navy (đọc chữ rõ, đúng brand).
   - Không resolve được → nền gradient navy/cam trang nhã như cũ (placeholder, chữ tối).

   ⚠️ Brief muốn VIDEO FLYCAM ở hero trang chủ. Demo dùng ảnh aerial chất lượng cao;
   chỗ này là nơi gắn <video> khi khách cấp clip (DECISIONS #4/#13). */
export function PageHero({
  eyebrow,
  title,
  tagline,
  image = "home/hero",
  imageAlt,
  actions,
  size = "lg",
}: {
  eyebrow?: string;
  title: string;
  tagline?: string;
  /** key ảnh hoặc URL; mặc định hero trang chủ. */
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  size?: "md" | "lg";
}) {
  const resolved = resolveImage(image);
  const onImage = Boolean(resolved); // có ảnh nền → chữ sáng trên nền tối

  const padding =
    size === "lg" ? "relative py-20 sm:py-28 lg:py-32" : "relative py-14 sm:py-20";

  return (
    <section
      className={
        onImage
          ? "relative overflow-hidden border-b border-border bg-primary text-primary-foreground"
          : "relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/60 to-background"
      }
    >
      {onImage ? (
        <>
          {/* Ảnh nền thật (ưu tiên tải — đây là LCP của trang). */}
          <Image
            src={resolved!}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Phủ navy gradient: đảm bảo WCAG contrast cho chữ trắng, giữ tông brand. */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/45" />
          {/* Chớm cam ở góc (dùng tiết chế) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_95%_110%,color-mix(in_oklch,var(--cta),transparent_82%)_0%,transparent_55%)]" />
        </>
      ) : (
        <>
          {/* Lớp nền trang nhã: vệt navy + chớm cam ở góc + lưới mảnh — KHÔNG phủ màu lớn */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_92%_-20%,color-mix(in_oklch,var(--cta),transparent_90%)_0%,transparent_55%),radial-gradient(80%_90%_at_-5%_0%,color-mix(in_oklch,var(--primary),transparent_92%)_0%,transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,var(--primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        </>
      )}

      <Container className={padding}>
        <div className="max-w-3xl space-y-5">
          {eyebrow ? (
            <p
              className={
                onImage
                  ? "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cta-foreground/95"
                  : "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cta"
              }
            >
              <span className="h-px w-6 bg-cta" />
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={
              onImage
                ? "text-3xl font-bold leading-[1.1] tracking-tight text-balance text-white drop-shadow-sm sm:text-4xl lg:text-5xl"
                : "text-3xl font-bold leading-[1.1] tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
            }
          >
            {title}
          </h1>
          {tagline ? (
            <p
              className={
                onImage
                  ? "max-w-2xl text-base text-primary-foreground/85 sm:text-lg"
                  : "max-w-2xl text-base text-muted-foreground sm:text-lg"
              }
            >
              {tagline}
            </p>
          ) : null}
          {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
