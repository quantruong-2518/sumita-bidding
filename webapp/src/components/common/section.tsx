import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/* Khối section chuẩn dùng lại toàn site: eyebrow · title · description · actions · nội dung. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
  container = true,
  bordered = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  container?: boolean;
  bordered?: boolean;
}) {
  const inner = (
    <>
      {(title || eyebrow || description || actions) && (
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-1.5">
            {eyebrow ? <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</p> : null}
            {title ? <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2> : null}
            {description ? <p className="text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
        </div>
      )}
      {children ? <div className={contentClassName}>{children}</div> : null}
    </>
  );

  return (
    <section id={id} className={cn("scroll-mt-28 py-10 sm:py-14", bordered && "border-t border-border", className)}>
      {container ? <Container>{inner}</Container> : inner}
    </section>
  );
}
