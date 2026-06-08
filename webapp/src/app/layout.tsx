import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";
import { CtaBar } from "@/components/shell/cta-bar";
import { LeadFormDialog } from "@/components/lead/lead-form-dialog";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});
const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sumita — Nền tảng xúc tiến đầu tư cụm công nghiệp",
    template: "%s · Sumita",
  },
  description:
    "Sumita — quỹ đất công nghiệp & nhà xưởng xây sẵn cho thuê tại chuỗi cụm công nghiệp. Nhận brochure, đặt lịch khảo sát, tư vấn đầu tư.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
      <body className="min-h-dvh bg-background text-foreground pb-16 lg:pb-0">
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <CtaBar />
          <LeadFormDialog />
        </Providers>
      </body>
    </html>
  );
}
