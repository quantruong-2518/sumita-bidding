"use client";

import Link from "next/link";
import { CONTACT, CTA_CHANNELS, FOOTER_LINKS } from "@/lib/mock";
import { useTx } from "@/lib/i18n/use-tx";
import { Container } from "@/components/common/section";
import { Icon } from "@/components/common/icon";
import { LeadForm } from "@/components/lead/lead-form";

/* G4 — Footer. Layout HIỆN TẠI = 4 cột tạm cho demo (thông tin · 2 cột menu · form).
   ⚠️CONFIRM (DECISIONS #15): brief §7 ghi 3 cột, sitemap.jfif vẽ 6 cột → chờ khách chốt, chưa đổi layout.
   Cột cuối = form đặt lịch khảo sát (engine chuyển đổi). */
export function SiteFooter() {
  const t = useTx();

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-12 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-heading text-xl font-extrabold tracking-tight">
            SUMITA<span className="text-cta">.</span>
          </p>
          <p className="text-sm text-primary-foreground/70">{CONTACT.company}</p>
          <p className="text-sm text-primary-foreground/70">{t(CONTACT.address)}</p>
          <div className="space-y-1.5 text-sm">
            <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary-foreground/85 transition-colors hover:text-cta">
              <Icon name="Phone" className="size-4" /> {CONTACT.hotline}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-primary-foreground/85 transition-colors hover:text-cta">
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
                  className="flex size-8 items-center justify-center rounded-lg border border-white/15 text-primary-foreground/85 transition-colors hover:border-cta/50 hover:bg-white/5 hover:text-cta"
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
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-cta">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-3 rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10">
          <p className="text-sm font-semibold">Đặt lịch khảo sát</p>
          <p className="text-sm text-primary-foreground/70">
            Để lại thông tin, đội ngũ Sumita sẽ liên hệ sắp lịch tham quan thực địa.
          </p>
          <LeadForm
            variant="khao-sat"
            source="footer"
            className="[&_.text-muted-foreground]:text-primary-foreground/65 [&_input::placeholder]:text-primary-foreground/40 [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-primary-foreground [&_label]:text-primary-foreground/85 [&_textarea::placeholder]:text-primary-foreground/40 [&_textarea]:border-white/15 [&_textarea]:bg-white/5 [&_textarea]:text-primary-foreground"
          />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <p>© 2026 {CONTACT.company}. Bản demo FE — dữ liệu mẫu.</p>
            <span className="hidden sm:inline text-primary-foreground/30">·</span>
            <p className="text-primary-foreground/55">
              — Một sản phẩm của{" "}
              <a
                href="https://seneravn-web.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary-foreground/80 underline-offset-2 transition-colors hover:text-cta hover:underline"
              >
                Senera
              </a>
              {" · "}
              <span className="whitespace-nowrap">
                Quân – Senera Founder ·{" "}
                <a href="tel:0345913369" className="transition-colors hover:text-cta">
                  0345913369
                </a>
              </span>
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/phap-ly/chinh-sach-bao-mat" className="transition-colors hover:text-cta">
              Chính sách bảo mật
            </Link>
            <Link href="/phap-ly/dieu-khoan" className="transition-colors hover:text-cta">
              Điều khoản
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
