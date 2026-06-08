"use client";

import type { Doc } from "@/lib/schema";
import { useTx } from "@/lib/i18n/use-tx";
import { useLeadStore } from "@/lib/store/lead-store";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/icon";

/* F2/O-02 — danh sách tài liệu + lead-gate: bấm "Tải" → mở form trước khi cho tải. */
export function DownloadList({ docs, ccnInterest, source }: { docs: Doc[]; ccnInterest?: string; source?: string }) {
  const t = useTx();
  const openLead = useLeadStore((s) => s.openLead);
  if (!docs.length) return null;

  return (
    <ul className="divide-y divide-border border border-border">
      {docs.map((d) => (
        <li key={d.id} className="flex items-center gap-3 p-3">
          <Icon name="FileText" className="size-5 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{t(d.title)}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {d.type} · {d.size}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              openLead({
                variant: "brochure",
                title: "Tải tài liệu",
                ccnInterest,
                source: source ?? "download-list",
                doc: { id: d.id, title: t(d.title), href: d.href },
              })
            }
          >
            <Icon name="Download" className="size-4" /> Tải
          </Button>
        </li>
      ))}
    </ul>
  );
}
