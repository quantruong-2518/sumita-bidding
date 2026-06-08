"use client";

import Link from "next/link";
import { CTA_CHANNELS } from "@/lib/mock";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { Icon } from "@/components/common/icon";
import { LeadButton } from "@/components/lead/lead-cta";

/* G3 — CTA bar sticky (Zalo/hotline/FB/LinkedIn + đặt lịch). brief §6.
   ⚠️CONFIRM: sitemap.jfif vẽ bộ icon khác (tìm kiếm/bản đồ/tài liệu/chia sẻ). */
export function CtaBar() {
  const t = useTx();
  const tt = useTt();
  const bookLabel = tt("Đặt lịch khảo sát", "Book a site visit");

  const Channel = ({
    id,
    icon,
    href,
    label,
    className,
  }: {
    id: string;
    icon: string;
    href: string;
    label: string;
    className?: string;
  }) => {
    const external = href.startsWith("http");
    return (
      <Link
        key={id}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        title={label}
        aria-label={label}
        className={`flex size-11 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 shadow-sm transition-colors hover:border-primary/30 hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:rounded-full ${className ?? ""}`}
      >
        <Icon name={icon} className="size-5" />
      </Link>
    );
  };

  return (
    <>
      {/* Mobile: thanh cố định dưới cùng. Touch target 44px (size-11).
          Màn rất nhỏ chỉ hiện Zalo + hotline để nút "Đặt lịch khảo sát" đủ to; ≥sm hiện đủ kênh. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
        {CTA_CHANNELS.map((c, i) => (
          <Channel
            key={c.id}
            id={c.id}
            icon={c.icon}
            href={c.href}
            label={t(c.label)}
            // ẩn kênh thứ 3,4 trên màn rất nhỏ (<640px) để nút CTA đủ rộng
            className={i >= 2 ? "hidden sm:flex" : ""}
          />
        ))}
        <LeadButton variant="cta" className="ml-auto min-w-0 flex-1 truncate" lead={{ variant: "khao-sat", title: bookLabel, source: "cta-bar" }}>
          {bookLabel}
        </LeadButton>
      </div>

      {/* Desktop: cột nổi bên phải. Nút "Đặt lịch khảo sát" (CTA chuyển đổi chính, brief §6) ở trên cùng. */}
      <div className="fixed bottom-6 right-4 z-40 hidden flex-col items-center gap-2 lg:flex">
        <LeadButton
          variant="cta"
          size="icon"
          title={bookLabel}
          aria-label={bookLabel}
          className="size-12 rounded-full shadow-md"
          lead={{ variant: "khao-sat", title: bookLabel, source: "cta-bar" }}
        >
          <Icon name="Calendar" className="size-5" />
        </LeadButton>
        {CTA_CHANNELS.map((c) => (
          <Channel key={c.id} id={c.id} icon={c.icon} href={c.href} label={t(c.label)} />
        ))}
      </div>
    </>
  );
}
