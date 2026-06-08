"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* Sticky sub-nav 12 mục (CCN §3) + scrollspy. Mobile = chips cuộn ngang.
   ⚠️CONFIRM: 12 mục có thể dài — cân nhắc gom nhóm (F4 §3). */
export function StickySubNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="sticky top-16 z-30 border-y border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-2 py-1 [scrollbar-width:none] sm:px-6 lg:px-8">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={cn(
              "whitespace-nowrap border-b-2 px-3 py-2 text-sm transition-colors",
              active === it.id
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
