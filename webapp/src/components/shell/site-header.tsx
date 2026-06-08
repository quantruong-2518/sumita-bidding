"use client";

import Link from "next/link";
import { useState } from "react";
import { MAIN_NAV } from "@/lib/mock";
import { useTx, useTt } from "@/lib/i18n/use-tx";
import { Container } from "@/components/common/section";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadButton } from "@/components/lead/lead-cta";
import { SearchBar } from "./search-bar";
import { LanguageSwitcher } from "./language-switcher";

/* G1/G2 — Header sticky + main menu + utility (search/lang). */
export function SiteHeader() {
  const t = useTx();
  const tt = useTt();
  const [open, setOpen] = useState(false);
  const bookLabel = tt("Đặt lịch khảo sát", "Book a site visit");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="flex items-baseline gap-px font-heading text-xl font-extrabold tracking-tight text-primary">
          SUMITA
          <span className="text-cta">.</span>
        </Link>

        {/* Nav đầy đủ chỉ hiện ở xl: 7 mục + cluster tiện ích không đủ chỗ 1 dòng dưới xl → dùng hamburger. */}
        <nav className="ml-2 hidden items-center gap-0.5 xl:flex">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    {t(item.label)}
                    <Icon name="ChevronDown" className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.children.map((c) => (
                    <DropdownMenuItem key={c.href} asChild>
                      <Link href={c.href}>{t(c.label)}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                <Link href={item.href}>{t(item.label)}</Link>
              </Button>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Tìm kiếm desktop = nút icon dẫn tới /search (ô input đầy đủ nằm trong menu mobile)
              — giữ header gọn 1 dòng, tránh chèn ô input chiếm chỗ của nav. */}
          <Button asChild variant="ghost" size="icon" className="hidden lg:inline-flex">
            <Link href="/search" aria-label={tt("Tìm kiếm", "Search")}>
              <Icon name="Search" className="size-4" />
            </Link>
          </Button>
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <LeadButton
            size="sm"
            variant="cta"
            className="hidden lg:inline-flex"
            lead={{ variant: "khao-sat", title: bookLabel, source: "header" }}
          >
            {bookLabel}
          </LeadButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label={tt("Mở menu", "Open menu")}>
                <Icon name="Menu" className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="font-heading text-lg font-extrabold tracking-tight text-primary">
                  SUMITA<span className="text-cta">.</span>
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-1 overflow-y-auto p-4">
                <SearchBar className="mb-3" onDone={() => setOpen(false)} />
                {MAIN_NAV.map((item) => (
                  <div key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="block py-2 font-medium">
                      {t(item.label)}
                    </Link>
                    {item.children ? (
                      <div className="ml-2 border-l border-border pl-3">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {t(c.label)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="pt-3">
                  <LanguageSwitcher />
                </div>
                <LeadButton
                  variant="cta"
                  className="mt-3 w-full"
                  lead={{ variant: "khao-sat", title: bookLabel, source: "mobile-menu" }}
                  onClick={() => setOpen(false)}
                >
                  {bookLabel}
                </LeadButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
