"use client";

import Link from "next/link";
import { CONTACT, CTA_CHANNELS, FOOTER_LINKS } from "@/lib/mock";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { Container } from "@/components/common/section";
import { Icon } from "@/components/common/icon";
import { LeadForm } from "@/components/lead/lead-form";

/* G4 — Footer.
   1) DẢI CTA "Đặt lịch khảo sát" full-width (engine chuyển đổi chính, brief §6) — nổi bật,
      layout 2 cột: copy thuyết phục + form có không gian thở. Form vẫn LeadForm variant="khao-sat" source="footer".
   2) Khối link footer.
   ⚠️CONFIRM (DECISIONS #15): brief §7 ghi 3 cột, sitemap.jfif vẽ 6 cột → hiện 4 cột tạm, CHƯA tự chốt layout. */
export function SiteFooter() {
  const t = useTx();
  const tt = useTt();
  const bookLabel = tt("Đặt lịch khảo sát", "Book a site visit");
  const benefits: [string, string][] = [
    ["Khảo sát mặt bằng theo nhu cầu diện tích", "Site survey based on your area needs"],
    ["Tư vấn pháp lý & tiến độ minh bạch", "Transparent legal & progress advice"],
    ["Báo giá thuê đất / nhà xưởng nhanh", "Fast land / factory lease quotes"],
    ["Hỗ trợ nhà đầu tư trong nước & FDI", "Support for domestic & FDI investors"],
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* ── DẢI ĐẶT LỊCH KHẢO SÁT (full-width, nổi bật) ── */}
      <section
        aria-labelledby="footer-khao-sat-title"
        className="relative overflow-hidden border-b border-white/10 bg-primary"
      >
        {/* Nền tương phản tiết chế: chớm cam góc phải + lưới mảnh (không phủ cam lớn). */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_0%,color-mix(in_oklch,var(--cta),transparent_80%)_0%,transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(80%_80%_at_0%_50%,black,transparent)]" />

        <Container className="relative grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16">
          {/* Cột copy thuyết phục */}
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cta">
              <span className="h-px w-6 bg-cta" />
              {tt("Tham quan thực địa miễn phí", "Free on-site visit")}
            </p>
            <h2
              id="footer-khao-sat-title"
              className="font-heading text-2xl font-bold leading-tight tracking-tight text-white text-balance sm:text-3xl lg:text-4xl"
            >
              {tt("Đặt lịch khảo sát cụm công nghiệp cùng Sumita", "Book an industrial cluster site visit with Sumita")}
            </h2>
            <p className="max-w-xl text-sm text-primary-foreground/80 sm:text-base">
              {tt(
                "Để lại thông tin, đội ngũ Sumita sẽ liên hệ sắp lịch tham quan thực địa, tư vấn quỹ đất & nhà xưởng phù hợp, đồng hành thủ tục đầu tư từ A-Z.",
                "Leave your details and the Sumita team will arrange an on-site visit, advise on suitable land and factories, and support your investment procedures end-to-end.",
              )}
            </p>
            <ul className="grid gap-2.5 text-sm text-primary-foreground/85 sm:grid-cols-2">
              {benefits.map(([vi, en]) => (
                <li key={vi} className="flex items-start gap-2">
                  <Icon name="Check" className="mt-0.5 size-4 shrink-0 text-cta" />
                  <span>{tt(vi, en)}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm">
              <a
                href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`}
                className="inline-flex min-w-0 items-center gap-2 font-semibold text-white transition-colors hover:text-cta"
              >
                <Icon name="Phone" className="size-4 shrink-0" /> {CONTACT.hotline}
              </a>
              <span className="text-primary-foreground/30">·</span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex min-w-0 items-center gap-2 text-primary-foreground/85 transition-colors hover:text-cta"
              >
                <Icon name="Mail" className="size-4 shrink-0" /> <span className="break-all">{CONTACT.email}</span>
              </a>
            </div>
          </div>

          {/* Cột form — card sáng trên nền navy, không gian thở rộng */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-sm sm:p-8">
            <p className="mb-1 text-base font-semibold text-white">{tt("Gửi yêu cầu khảo sát", "Send a visit request")}</p>
            <p className="mb-5 text-sm text-primary-foreground/65">{tt("Phản hồi trong 24 giờ làm việc.", "Reply within 24 working hours.")}</p>
            <LeadForm
              variant="khao-sat"
              source="footer"
              className="[&_.text-muted-foreground]:text-primary-foreground/65 [&_input::placeholder]:text-primary-foreground/40 [&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-primary-foreground [&_label]:text-primary-foreground/85 [&_textarea::placeholder]:text-primary-foreground/40 [&_textarea]:border-white/15 [&_textarea]:bg-white/5 [&_textarea]:text-primary-foreground"
            />
          </div>
        </Container>
      </section>

      {/* ── KHỐI LINK FOOTER ── */}
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-heading text-xl font-extrabold tracking-tight">
            SUMITA<span className="text-cta">.</span>
          </p>
          <p className="text-sm text-primary-foreground/70">{CONTACT.company}</p>
          <p className="text-sm text-primary-foreground/70">{t(CONTACT.address)}</p>
          <div className="space-y-1.5 text-sm">
            <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="flex min-w-0 items-center gap-2 text-primary-foreground/85 transition-colors hover:text-cta">
              <Icon name="Phone" className="size-4 shrink-0" /> {CONTACT.hotline}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex min-w-0 items-center gap-2 text-primary-foreground/85 transition-colors hover:text-cta">
              <Icon name="Mail" className="size-4 shrink-0" /> <span className="break-all">{CONTACT.email}</span>
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
                  className="flex size-9 items-center justify-center rounded-lg border border-white/15 text-primary-foreground/85 transition-colors hover:border-cta/50 hover:bg-white/5 hover:text-cta"
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
                  <Link href={l.href} className="inline-block py-0.5 transition-colors hover:text-cta">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Cột nhắc nhanh đặt lịch (form chính đã ở dải trên) */}
        <div className="space-y-3">
          <p className="text-sm font-semibold">{tt("Cần tư vấn nhanh?", "Need quick advice?")}</p>
          <p className="text-sm text-primary-foreground/70">
            {tt(
              "Đặt lịch khảo sát thực địa hoặc gọi hotline để được hỗ trợ ngay.",
              "Book an on-site visit or call the hotline for immediate support.",
            )}
          </p>
          <Link
            href="/book-visit"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            <Icon name="Calendar" className="size-4 shrink-0" /> {bookLabel}
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <p>© 2026 {CONTACT.company}. {tt("Bản demo FE · dữ liệu mẫu.", "FE demo · sample data.")}</p>
            <span className="hidden sm:inline text-primary-foreground/30">·</span>
            <p className="text-primary-foreground/55">
              {tt("Một sản phẩm của", "A product by")}{" "}
              <a
                href="https://seneravn-web.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary-foreground/80 underline-offset-2 transition-colors hover:text-cta hover:underline"
              >
                Senera
              </a>
              {" · "}
              <span>
                Quân, Senera Founder ·{" "}
                <a href="tel:0345913369" className="whitespace-nowrap transition-colors hover:text-cta">
                  0345913369
                </a>
              </span>
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/legal/chinh-sach-bao-mat" className="transition-colors hover:text-cta">
              {tt("Chính sách bảo mật", "Privacy policy")}
            </Link>
            <Link href="/legal/dieu-khoan" className="transition-colors hover:text-cta">
              {tt("Điều khoản", "Terms")}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
