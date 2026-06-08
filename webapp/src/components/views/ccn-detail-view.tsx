"use client";

import { useCcn, useDocs } from "@/lib/query/hooks";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { CCN_STATUS_LABEL, LEGAL_STATUS_LABEL } from "@/lib/i18n/labels";
import { Container, Section } from "@/components/common/section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { PageHero } from "@/components/common/page-hero";
import { StickySubNav } from "@/components/common/sticky-sub-nav";
import {
  DefinitionList,
  DescriptionList,
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

export function CcnDetailView({ slug }: { slug: string }) {
  const t = useTx();
  const tt = useTt();
  const { data, isLoading, isError, refetch } = useCcn(slug);
  const legalStatusLabel = (s: keyof typeof LEGAL_STATUS_LABEL) =>
    LEGAL_STATUS_LABEL[s] ? t(LEGAL_STATUS_LABEL[s]) : s;
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
        <EmptyState title={tt("Không tìm thấy cụm công nghiệp", "Industrial cluster not found")} />
      </Section>
    );
  }

  const ccn = data;
  const statusLabel = CCN_STATUS_LABEL[ccn.status] ? t(CCN_STATUS_LABEL[ccn.status]) : ccn.status;

  // ── Cấu hình 12 section (id · label · hasData · render) ──
  type SectionConfig = { id: string; label: string; title: string; hasData: boolean; render: () => React.ReactNode };

  const sections: SectionConfig[] = [
    // 1. Tổng quan — luôn có
    {
      id: "tong-quan",
      label: tt("Tổng quan", "Overview"),
      title: tt("Tổng quan", "Overview"),
      hasData: true,
      render: () => {
        const items: { label: string; value: string }[] = [{ label: tt("Diện tích", "Area"), value: `${ccn.area} ha` }];
        if (ccn.occupancy != null) items.push({ label: tt("Tỉ lệ lấp đầy", "Occupancy rate"), value: `${ccn.occupancy}%` });
        if (ccn.priceFrom) items.push({ label: tt("Giá thuê", "Lease price"), value: t(ccn.priceFrom) });
        if (ccn.landType) items.push({ label: tt("Loại hình", "Land type"), value: t(ccn.landType) });
        items.push({ label: tt("Trạng thái", "Status"), value: statusLabel });
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
      label: tt("Vị trí", "Location"),
      title: tt("Vị trí chiến lược", "Strategic location"),
      hasData: true,
      render: () => (
        <div className="space-y-6">
          <p className="text-foreground/90">{t(ccn.location.address)}</p>
          <DefinitionList items={ccn.location.distances.map((d) => ({ label: t(d.label), value: d.value }))} />
          <Media src={ccn.location.image} label={tt("Bản đồ vị trí", "Location map")} alt={`${tt("Vị trí", "Location")} ${t(ccn.name)}`} sizes="(max-width: 1024px) 100vw, 66vw" />
        </div>
      ),
    },

    // 3. Quy hoạch — masterPlanImage || zones
    {
      id: "quy-hoach",
      label: tt("Quy hoạch", "Master plan"),
      title: tt("Quy hoạch mặt bằng", "Master plan"),
      hasData: Boolean(ccn.masterPlanImage) || ccn.zones.length > 0,
      render: () => (
        <div className="space-y-6">
          <Media src={ccn.masterPlanImage} label={tt("Mặt bằng quy hoạch", "Master plan layout")} alt={`${tt("Quy hoạch", "Master plan")} ${t(ccn.name)}`} sizes="(max-width: 1024px) 100vw, 66vw" />
          {/* Phân khu = tên (dài) + ghi chú → DescriptionList xếp dọc, không dùng justify-between */}
          <DescriptionList
            columns={2}
            items={ccn.zones.map((z) => ({ label: t(z.name), value: z.note ? t(z.note) : tt("Theo quy hoạch", "Per master plan") }))}
          />
        </div>
      ),
    },

    // 4. Hạ tầng — infrastructure
    {
      id: "ha-tang",
      label: tt("Hạ tầng", "Infrastructure"),
      title: tt("Hạ tầng kỹ thuật", "Technical infrastructure"),
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
      label: tt("Ngành nghề", "Industries"),
      title: tt("Ngành nghề thu hút", "Target industries"),
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
      label: tt("Lao động", "Labor"),
      title: tt("Lao động & dân cư", "Labor & population"),
      hasData: ccn.labor.length > 0,
      render: () => <StatList items={ccn.labor.map((x) => ({ label: t(x.label), value: t(x.value) }))} />,
    },

    // 7. Ưu đãi — incentives
    {
      id: "uu-dai",
      label: tt("Ưu đãi", "Incentives"),
      title: tt("Chính sách ưu đãi", "Incentive policies"),
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
      label: tt("Pháp lý", "Legal status"),
      title: tt("Pháp lý dự án", "Project legal status"),
      hasData: ccn.legal.length > 0,
      render: () => (
        <DefinitionList items={ccn.legal.map((l) => ({ label: t(l.item), value: legalStatusLabel(l.status) }))} />
      ),
    },

    // 9. Tiến độ — progress hoặc milestones
    {
      id: "tien-do",
      label: tt("Tiến độ", "Progress"),
      title: tt("Tiến độ thực tế", "Actual progress"),
      hasData: ccn.progress != null || ccn.milestones.length > 0,
      render: () => (
        <div className="space-y-6">
          {ccn.progress != null ? <p className="font-medium">{tt("Tiến độ", "Progress")}: {ccn.progress}%</p> : null}
          <Timeline items={ccn.milestones.map((m) => ({ date: m.date, label: t(m.label), done: m.done }))} />
        </div>
      ),
    },

    // 10. Hình ảnh / flycam — gallery
    {
      id: "hinh-anh",
      label: tt("Hình ảnh", "Gallery"),
      title: tt("Hình ảnh / flycam", "Gallery / aerial footage"),
      hasData: ccn.gallery.length > 0,
      render: () => (
        <div className="space-y-6">
          {/* Demo: ảnh aerial + nút Play giả lập video flycam. Production = thay <video> clip khách cấp (DECISIONS #4). */}
          {ccn.flycamVideo ? (
            <div className="group/flycam relative overflow-hidden rounded-lg">
              <Media src={ccn.flycamVideo} label={tt("Video flycam", "Aerial video")} alt={`${tt("Flycam", "Aerial")} ${t(ccn.name)}`} ratio={16 / 9} sizes="(max-width: 1024px) 100vw, 66vw" />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-cta text-cta-foreground shadow-lg transition-transform group-hover/flycam:scale-105">
                  <Icon name="Play" className="size-7" />
                </span>
              </span>
              <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-primary/70 px-2 py-1 text-xs font-medium text-white">
                {tt("Video flycam (demo — clip sẽ do khách cung cấp)", "Aerial video (demo — clip to be provided by client)")}
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
      label: tt("Tài liệu", "Downloads"),
      title: tt("Tài liệu", "Downloads"),
      hasData: true,
      render: () =>
        docs && docs.length > 0 ? (
          <DownloadList docs={docs} ccnInterest={t(ccn.name)} source="ccn-detail" />
        ) : (
          <EmptyState title={tt("Chưa có tài liệu", "No documents yet")} description={tt("Tài liệu cho cụm công nghiệp này sẽ được cập nhật.", "Documents for this industrial cluster will be updated soon.")} icon="FileText" />
        ),
    },

    // 12. Đăng ký — luôn hiện
    {
      id: "dang-ky",
      label: tt("Đăng ký", "Register"),
      title: tt("Đăng ký tư vấn / khảo sát", "Register for consultation / site visit"),
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
            { label: tt("Trang chủ", "Home"), href: "/" },
            { label: tt("Sản phẩm", "Products"), href: "/products/industrial-land" },
            { label: tt("Đất công nghiệp", "Industrial land"), href: "/products/industrial-land" },
            { label: t(ccn.name) },
          ]}
        />
      </Container>

      <PageHero
        eyebrow={statusLabel}
        title={t(ccn.name)}
        tagline={t(ccn.tagline)}
        image={ccn.heroImage}
        imageAlt={`${tt("Toàn cảnh", "Aerial view of")} ${t(ccn.name)}`}
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
