"use client";

import { CONTACT, CTA_CHANNELS } from "@/lib/mock";
import { useMapPins } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { MapPlaceholder } from "@/components/common/map-placeholder";
import { LoadingLines, ErrorState, EmptyState } from "@/components/common/states";
import { Icon } from "@/components/common/icon";
import { LeadForm } from "@/components/lead/lead-form";

/* P-12 Liên hệ — thông tin công ty + bản đồ (trái) · form liên hệ (phải). */
export function ContactView() {
  const t = useTx();
  const tt = useTt();
  const { data: pins, isLoading, isError, refetch } = useMapPins();
  const hotlineTel = CONTACT.hotline.replace(/\s/g, "");

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tt("Trang chủ", "Home"), href: "/" },
          { label: tt("Liên hệ", "Contact") },
        ]}
        title={tt("Liên hệ", "Contact")}
        description={tt(
          "Kết nối với đội ngũ Sumita để được tư vấn đầu tư.",
          "Connect with the Sumita team for investment consulting.",
        )}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT — thông tin công ty + bản đồ */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-lg font-semibold">{CONTACT.company}</p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="MapPin" className="mt-0.5 size-4 shrink-0" />
                <span className="min-w-0">{t(CONTACT.address)}</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Icon name="Phone" className="size-4 shrink-0 text-muted-foreground" />
                <a href={`tel:${hotlineTel}`} className="min-w-0 break-words font-medium hover:underline">
                  {CONTACT.hotline}
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Icon name="Mail" className="size-4 shrink-0 text-muted-foreground" />
                <a href={`mailto:${CONTACT.email}`} className="min-w-0 break-all font-medium hover:underline">
                  {CONTACT.email}
                </a>
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {CTA_CHANNELS.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t(ch.label)}
                    className="flex size-9 items-center justify-center border border-border hover:bg-accent"
                  >
                    <Icon name={ch.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {isLoading ? (
              <LoadingLines lines={4} />
            ) : isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : !pins?.length ? (
              <EmptyState title={tt("Chưa có dữ liệu bản đồ", "No map data yet")} />
            ) : (
              <MapPlaceholder
                pins={pins.map((p) => ({
                  id: p.ccnSlug,
                  label: t(p.name),
                  x: p.x,
                  y: p.y,
                  lat: p.lat,
                  lng: p.lng,
                  href: `/products/industrial-land/${p.ccnSlug}`,
                }))}
              />
            )}
          </div>

          {/* RIGHT — form liên hệ */}
          <div className="border border-border p-6">
            <h2 className="mb-4 text-xl font-semibold">{tt("Gửi liên hệ", "Send a message")}</h2>
            <LeadForm variant="lien-he" source="contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
