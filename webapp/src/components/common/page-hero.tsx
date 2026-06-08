import { Container } from "./section";

/* Hero tái dùng (trang chủ + chi tiết CCN). Nền = placeholder ảnh/flycam (DECISIONS #13). */
export function PageHero({
  eyebrow,
  title,
  tagline,
  image = "Ảnh / video flycam (hero)",
  actions,
  size = "lg",
}: {
  eyebrow?: string;
  title: string;
  tagline?: string;
  image?: string;
  actions?: React.ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/60 to-background">
      {/* Lớp nền trang nhã: vệt navy + chớm cam ở góc + lưới mảnh — KHÔNG phủ màu lớn */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_92%_-20%,color-mix(in_oklch,var(--cta),transparent_90%)_0%,transparent_55%),radial-gradient(80%_90%_at_-5%_0%,color-mix(in_oklch,var(--primary),transparent_92%)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,var(--primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className={size === "lg" ? "relative py-16 sm:py-24 lg:py-28" : "relative py-12 sm:py-16"}>
        <div className="max-w-3xl space-y-5">
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cta">
              <span className="h-px w-6 bg-cta/70" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {tagline ? <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{tagline}</p> : null}
          {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
        </div>
        <span className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-muted-foreground/50">{image}</span>
      </Container>
    </section>
  );
}
