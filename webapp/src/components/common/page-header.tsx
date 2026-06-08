import { Container } from "./section";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/* Header chuẩn cho trang con: breadcrumb + tiêu đề H1 + mô tả + actions. */
export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
}: {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-muted/40">
      <Container className="space-y-4 py-8 sm:py-10">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-2">
            {eyebrow ? <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</p> : null}
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
            {description ? <p className="text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
