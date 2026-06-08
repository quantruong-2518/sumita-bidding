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
    <section className="relative border-b border-border bg-muted">
      <Container className={size === "lg" ? "relative py-16 sm:py-24 lg:py-28" : "relative py-12 sm:py-16"}>
        <div className="max-w-3xl space-y-5">
          {eyebrow ? <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</p> : null}
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {tagline ? <p className="text-base text-muted-foreground sm:text-lg">{tagline}</p> : null}
          {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
        </div>
        <span className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-muted-foreground/60">{image}</span>
      </Container>
    </section>
  );
}
