"use client";

import Link from "next/link";
import { CTA_CHANNELS } from "@/lib/mock";
import { useTx } from "@/lib/i18n/use-tx";
import { Icon } from "@/components/common/icon";
import { LeadButton } from "@/components/lead/lead-cta";

/* G3 — CTA bar sticky (Zalo/hotline/FB/LinkedIn + đặt lịch). brief §6.
   ⚠️CONFIRM: sitemap.jfif vẽ bộ icon khác (tìm kiếm/bản đồ/tài liệu/chia sẻ). */
export function CtaBar() {
  const t = useTx();

  const Channel = ({ id, icon, href, label }: { id: string; icon: string; href: string; label: string }) => {
    const external = href.startsWith("http");
    return (
      <Link
        key={id}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        title={label}
        aria-label={label}
        className="flex size-10 items-center justify-center border border-border bg-background hover:bg-accent"
      >
        <Icon name={icon} className="size-5" />
      </Link>
    );
  };

  return (
    <>
      {/* Mobile: thanh cố định dưới cùng */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-background p-2 lg:hidden">
        {CTA_CHANNELS.map((c) => (
          <Channel key={c.id} id={c.id} icon={c.icon} href={c.href} label={t(c.label)} />
        ))}
        <LeadButton className="ml-auto flex-1" lead={{ variant: "khao-sat", title: "Đặt lịch khảo sát", source: "cta-bar" }}>
          Đặt lịch khảo sát
        </LeadButton>
      </div>

      {/* Desktop: cột nổi bên phải */}
      <div className="fixed bottom-6 right-4 z-40 hidden flex-col gap-2 lg:flex">
        {CTA_CHANNELS.map((c) => (
          <Channel key={c.id} id={c.id} icon={c.icon} href={c.href} label={t(c.label)} />
        ))}
      </div>
    </>
  );
}
