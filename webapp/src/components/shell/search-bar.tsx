"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

/* Ô tìm kiếm (G2) → điều hướng /tim-kiem?q= (O-04). */
export function SearchBar({ className, onDone }: { className?: string; onDone?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const v = q.trim();
        if (!v) return;
        router.push(`/tim-kiem?q=${encodeURIComponent(v)}`);
        onDone?.();
      }}
      className={cn("relative", className)}
      role="search"
    >
      <Icon name="Search" className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm kiếm…"
        aria-label="Tìm kiếm"
        className="h-8 pl-8"
      />
    </form>
  );
}
