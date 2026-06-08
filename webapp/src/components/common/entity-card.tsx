import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Media } from "./media";
import { Icon } from "./icon";
import { gridColsClass } from "./grid";

export function CardGrid({
  columns = 3,
  className,
  children,
}: {
  columns?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("grid gap-4 sm:gap-6", gridColsClass[columns], className)}>{children}</div>;
}

export type EntityCardProps = {
  href?: string;
  image?: string;
  imageRatio?: number;
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  meta?: { label: string; value: string }[];
  tags?: string[];
  ctaLabel?: string;
  footer?: React.ReactNode;
};

/* THẺ TÁI DÙNG cho CCN / nhà xưởng / tin tức / việc làm. Một component, nhiều biến thể qua props. */
export function EntityCard({
  href,
  image,
  imageRatio = 16 / 9,
  badge,
  title,
  subtitle,
  description,
  meta,
  tags,
  ctaLabel,
  footer,
}: EntityCardProps) {
  return (
    <Card className="group/entity relative flex flex-col gap-0 overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/[0.06] hover:ring-primary/20">
      {/* Chỉ render ảnh khi có `image` (vd CCN/nhà xưởng/tin tức). Thẻ không ảnh (vd tuyển dụng)
          bỏ hẳn khối ảnh — tránh placeholder lặp lại tiêu đề. Badge cần ảnh làm nền nên đi cùng. */}
      {image ? (
        <div className="relative">
          <Media
            src={image}
            label={title}
            alt={title}
            ratio={imageRatio}
            className="border-0 border-b border-border"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {badge ? (
            <Badge variant="default" className="absolute left-3 top-3">
              {badge}
            </Badge>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1">
          {/* Badge cho thẻ không ảnh hiển thị inline (không có nền ảnh để phủ lên) */}
          {!image && badge ? (
            <Badge variant="secondary" className="mb-1">
              {badge}
            </Badge>
          ) : null}
          <h3 className="font-heading text-lg font-semibold leading-snug text-balance line-clamp-2">
            {href ? (
              <Link href={href} className="outline-none transition-colors after:absolute after:inset-0 group-hover/entity:text-primary">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          {subtitle ? <p className="line-clamp-2 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>

        {description ? <p className="line-clamp-3 text-sm text-foreground/80">{description}</p> : null}

        {meta?.length ? (
          <dl className="mt-1 space-y-1.5 text-sm">
            {meta.map((m, i) => (
              <div key={i} className="flex items-baseline justify-between gap-3 border-b border-border pb-1.5">
                <dt className="min-w-0 text-muted-foreground">{m.label}</dt>
                <dd className="min-w-0 break-words text-right font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-auto pt-2">
          {footer ??
            (href && ctaLabel ? (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {ctaLabel}
                <Icon name="ArrowRight" className="size-4 transition-transform group-hover/entity:translate-x-0.5" />
              </span>
            ) : null)}
        </div>
      </div>
    </Card>
  );
}
