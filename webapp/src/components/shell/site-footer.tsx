"use client";

import Link from "next/link";
import { CONTACT, CTA_CHANNELS, FOOTER_LINKS } from "@/lib/mock";
import { useTx } from "@/lib/i18n/use-tx";
import { Container } from "@/components/common/section";
import { Icon } from "@/components/common/icon";
import { LeadForm } from "@/components/lead/lead-form";

/* G4 — Footer 3 cột (brief §7). ⚠️CONFIRM: sitemap.jfif vẽ 6 cột.
   Cột cuối = form đặt lịch khảo sát (engine chuyển đổi). */
export function SiteFooter() {
  const t = useTx();

  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="grid gap-10 py-12 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-lg font-bold tracking-tight">SUMITA</p>
          <p className="text-sm text-muted-foreground">{CONTACT.company}</p>
          <p className="text-sm text-muted-foreground">{t(CONTACT.address)}</p>
          <div className="space-y-1.5 text-sm">
            <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:underline">
              <Icon name="Phone" className="size-4" /> {CONTACT.hotline}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:underline">
              <Icon name="Mail" className="size-4" /> {CONTACT.email}
            </a>
          </div>
          <div className="flex gap-2 pt-1">
            {CTA_CHANNELS.map((c) => {
              const external = c.href.startsWith("http");
              return (
                <a
                  key={c.id}
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={t(c.label)}
                  className="flex size-8 items-center justify-center border border-border hover:bg-accent"
                >
                  <Icon name={c.icon} className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.title.vi} className="space-y-3">
            <p className="text-sm font-semibold">{t(col.title)}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-foreground hover:underline">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-3">
          <p className="text-sm font-semibold">Đặt lịch khảo sát</p>
          <p className="text-sm text-muted-foreground">
            Để lại thông tin, đội ngũ Sumita sẽ liên hệ sắp lịch tham quan thực địa.
          </p>
          <LeadForm variant="khao-sat" source="footer" />
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 {CONTACT.company}. Bản demo FE — dữ liệu mẫu.</p>
          <div className="flex gap-4">
            <Link href="/phap-ly/chinh-sach-bao-mat" className="hover:underline">
              Chính sách bảo mật
            </Link>
            <Link href="/phap-ly/dieu-khoan" className="hover:underline">
              Điều khoản
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
