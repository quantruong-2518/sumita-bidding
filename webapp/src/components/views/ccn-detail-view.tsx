"use client";

import { useCcn, useDocs } from "@/lib/query/hooks";
import { useTx } from "@/lib/i18n/use-tx";
import type { Ccn } from "@/lib/schema";
import { Container, Section } from "@/components/common/section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { PageHero } from "@/components/common/page-hero";
import { StickySubNav } from "@/components/common/sticky-sub-nav";
import {
  DefinitionList,
  IconFeatureGrid,
  RichText,
  StatList,
  TagList,
  Timeline,
} from "@/components/common/data-blocks";
import { Gallery } from "@/components/common/gallery";
import { Media } from "@/components/common/media";
import { Icon } from "@/components/common/icon";
import { LoadingCards, LoadingLines, EmptyState, ErrorState } from "@/components/common/states";
import { ConversionCtas } from "@/components/lead/lead-cta";
import { DownloadList } from "@/components/lead/download-list";
import { LeadForm } from "@/components/lead/lead-form";

/* F4 / P-05 — TEMPLATE CHI TIẾT CCN (12 mục, tái dùng).
   Sub-nav + thân trang sinh từ cùng 1 mảng `sections` → luôn đồng bộ.
   AC-02: section không có dữ liệu → ẩn cả ở sub-nav lẫn nội dung. */

// ── enum label maps ──
const STATUS_LABEL: Record<Ccn["status"], string> = {
  "dang-cho-thue": "Đang cho thuê",
  "sap-mo-ban": "Sắp mở bán",
  "da-lap-day": "Đã lấp đầy",
};

type LegalStatus = "xong" | "dang-lam" | "ke-hoach";
const LEGAL_STATUS_LABEL: Record<LegalStatus, string> = {
  xong: "Hoàn thành",
  "dang-lam": "Đang thực hiện",
  "ke-hoach": "Kế hoạch",
};
const legalStatusLabel = (s: LegalStatus) => LEGAL_STATUS_LABEL[s] ?? s;

export function CcnDetailView({ slug }: { slug: string }) {
  const t = useTx();
  const { data, isLoading, isError, refetch } = useCcn(slug);
  // Hook tài liệu gọi vô điều kiện ở top-level (mục 11). docs có thể rỗng → EmptyState.
  const { data: docs } = useDocs({ ccnSlug: slug });

  if (isLoading) {
    return (
      <Section>
        <LoadingLines lines={2} className="mb-8 max-w-md" />
        <LoadingCards columns={3} count={6} />
      </Section>
    );
  }
  if (isError) {
    return (
      <Section>
        <ErrorState onRetry={() => refetch()} />
      </Section>
    );
  }
  if (!data) {
    return (
      <Section>
        <EmptyState title="Không tìm thấy cụm công nghiệp" />
      </Section>
    );
  }

  const ccn = data;
  const statusLabel = STATUS_LABEL[ccn.status] ?? ccn.status;

  // ── Cấu hình 12 section (id · label · hasData · render) ──
  type SectionConfig = { id: string; label: string; title: string; hasData: boolean; render: () => React.ReactNode };

  const sections: SectionConfig[] = [
    // 1. Tổng quan — luôn có
    {
      id: "tong-quan",
      label: "Tổng quan",
      title: "Tổng quan",
      hasData: true,
      render: () => {
        const items: { label: string; value: string }[] = [{ label: "Diện tích", value: `${ccn.area} ha` }];
        if (ccn.occupancy != null) items.push({ label: "Tỉ lệ lấp đầy", value: `${ccn.occupancy}%` });
        if (ccn.priceFrom) items.push({ label: "Giá thuê", value: t(ccn.priceFrom) });
        if (ccn.landType) items.push({ label: "Loại hình", value: t(ccn.landType) });
        items.push({ label: "Trạng thái", value: statusLabel });
        return (
          <div className="space-y-6">
            <RichText content={t(ccn.overview)} />
            <DefinitionList items={items} />
          </div>
        );
      },
    },

    // 2. Vị trí — luôn có (address tồn tại)
    {
      id: "vi-tri",
      label: "Vị trí",
      title: "Vị trí chiến lược",
      hasData: true,
      render: () => (
        <div className="space-y-6">
          <p className="text-foreground/90">{t(ccn.location.address)}</p>
          <DefinitionList items={ccn.location.distances.map((d) => ({ label: t(d.label), value: d.value }))} />
          <Media src={ccn.location.image} label="Bản đồ vị trí" alt={`Vị trí ${t(ccn.name)}`} sizes="(max-width: 1024px) 100vw, 66vw" />
        </div>
      ),
    },

    // 3. Quy hoạch — masterPlanImage || zones
    {
      id: "quy-hoach",
      label: "Quy hoạch",
      title: "Quy hoạch mặt bằng",
      hasData: Boolean(ccn.masterPlanImage) || ccn.zones.length > 0,
      render: () => (
        <div className="space-y-6">
          <Media src={ccn.masterPlanImage} label="Mặt bằng quy hoạch" alt={`Quy hoạch ${t(ccn.name)}`} sizes="(max-width: 1024px) 100vw, 66vw" />
          <DefinitionList items={ccn.zones.map((z) => ({ label: t(z.name), value: z.note ? t(z.note) : "—" }))} />
        </div>
      ),
    },

    // 4. Hạ tầng — infrastructure
    {
      id: "ha-tang",
      label: "Hạ tầng",
      title: "Hạ tầng kỹ thuật",
      hasData: ccn.infrastructure.length > 0,
      render: () => (
        <IconFeatureGrid
          items={ccn.infrastructure.map((i) => ({ icon: i.icon, title: t(i.label), desc: i.spec ? t(i.spec) : undefined }))}
        />
      ),
    },

    // 5. Ngành nghề — industries
    {
      id: "nganh-nghe",
      label: "Ngành nghề",
      title: "Ngành nghề thu hút",
      hasData: ccn.industries.length > 0,
      render: () => (
        <TagList
          items={ccn.industries.map((ind) => ({
            label: t(ind.name),
            variant: ind.type === "uu-tien" ? "default" : ind.type === "han-che" ? "outline" : "secondary",
          }))}
        />
      ),
    },

    // 6. Lao động — labor
    {
      id: "lao-dong",
      label: "Lao động",
      title: "Lao động & dân cư",
      hasData: ccn.labor.length > 0,
      render: () => <StatList items={ccn.labor.map((x) => ({ label: t(x.label), value: t(x.value) }))} />,
    },

    // 7. Ưu đãi — incentives
    {
      id: "uu-dai",
      label: "Ưu đãi",
      title: "Chính sách ưu đãi",
      hasData: ccn.incentives.length > 0,
      render: () => (
        <ul className="list-disc space-y-1 pl-5">
          {ccn.incentives.map((item, i) => (
            <li key={i}>{t(item)}</li>
          ))}
        </ul>
      ),
    },

    // 8. Pháp lý — legal
    {
      id: "phap-ly",
      label: "Pháp lý",
      title: "Pháp lý dự án",
      hasData: ccn.legal.length > 0,
      render: () => (
        <DefinitionList items={ccn.legal.map((l) => ({ label: t(l.item), value: legalStatusLabel(l.status) }))} />
      ),
    },

    // 9. Tiến độ — progress hoặc milestones
    {
      id: "tien-do",
      label: "Tiến độ",
      title: "Tiến độ thực tế",
      hasData: ccn.progress != null || ccn.milestones.length > 0,
      render: () => (
        <div className="space-y-6">
          {ccn.progress != null ? <p className="font-medium">Tiến độ: {ccn.progress}%</p> : null}
          <Timeline items={ccn.milestones.map((m) => ({ date: m.date, label: t(m.label), done: m.done }))} />
        </div>
      ),
    },

    // 10. Hình ảnh / flycam — gallery
    {
      id: "hinh-anh",
      label: "Hình ảnh",
      title: "Hình ảnh / flycam",
      hasData: ccn.gallery.length > 0,
      render: () => (
        <div className="space-y-6">
          {/* Demo: ảnh aerial + nút Play giả lập video flycam. Production = thay <video> clip khách cấp (DECISIONS #4). */}
          {ccn.flycamVideo ? (
            <div className="group/flycam relative overflow-hidden rounded-lg">
              <Media src={ccn.flycamVideo} label="Video flycam" alt={`Flycam ${t(ccn.name)}`} ratio={16 / 9} sizes="(max-width: 1024px) 100vw, 66vw" />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-cta text-cta-foreground shadow-lg transition-transform group-hover/flycam:scale-105">
                  <Icon name="Play" className="size-7" />
                </span>
              </span>
              <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-primary/70 px-2 py-1 text-xs font-medium text-white">
                Video flycam (demo — clip sẽ do khách cung cấp)
              </span>
            </div>
          ) : null}
          <Gallery items={ccn.gallery.map((g) => ({ src: g }))} />
        </div>
      ),
    },

    // 11. Tài liệu — luôn hiện (rỗng → EmptyState)
    {
      id: "tai-lieu",
      label: "Tài liệu",
      title: "Tài liệu",
      hasData: true,
      render: () =>
        docs && docs.length > 0 ? (
          <DownloadList docs={docs} ccnInterest={t(ccn.name)} source="ccn-detail" />
        ) : (
          <EmptyState title="Chưa có tài liệu" description="Tài liệu cho cụm công nghiệp này sẽ được cập nhật." icon="FileText" />
        ),
    },

    // 12. Đăng ký — luôn hiện
    {
      id: "dang-ky",
      label: "Đăng ký",
      title: "Đăng ký tư vấn / khảo sát",
      hasData: true,
      render: () => (
        <LeadForm variant="tu-van" defaultCcnInterest={t(ccn.name)} source="ccn-detail" />
      ),
    },
  ];

  const visible = sections.filter((s) => s.hasData);
  const subnavItems = visible.map((s) => ({ id: s.id, label: s.label }));

  return (
    <>
      <Container className="py-4">
        <Breadcrumbs
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Sản phẩm", href: "/san-pham/dat-cong-nghiep" },
            { label: "Đất công nghiệp", href: "/san-pham/dat-cong-nghiep" },
            { label: t(ccn.name) },
          ]}
        />
      </Container>

      <PageHero
        eyebrow={statusLabel}
        title={t(ccn.name)}
        tagline={t(ccn.tagline)}
        image={ccn.heroImage}
        imageAlt={`Toàn cảnh ${t(ccn.name)}`}
        size="md"
        actions={<ConversionCtas ccnInterest={t(ccn.name)} source="ccn-hero" />}
      />

      <StickySubNav items={subnavItems} />

      {visible.map((s) => (
        <Section key={s.id} id={s.id} title={s.title} bordered>
          {s.render()}
        </Section>
      ))}
    </>
  );
}
