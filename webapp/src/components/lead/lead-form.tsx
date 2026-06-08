"use client";

import { useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LeadInput, type LeadVariant } from "@/lib/schema";
import { useTt } from "@/lib/i18n/use-tx";
import { useSubmitLead } from "@/lib/query/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

/* FORM CHUYỂN ĐỔI DUY NHẤT — dùng cho brochure / khảo sát / tư vấn / liên hệ / ứng tuyển (F3).
   Đổi variant để bật/tắt trường. Submit → useSubmitLead (mutation) → state success (O-08). */

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export type LeadFormProps = {
  variant: LeadVariant;
  defaultCcnInterest?: string;
  source?: string;
  onSuccess?: (res: { ok: true; id: string }, values: LeadInput) => void;
  successExtra?: React.ReactNode;
  className?: string;
};

export function LeadForm({ variant, defaultCcnInterest, source, onSuccess, successExtra, className }: LeadFormProps) {
  const tt = useTt();
  const { mutateAsync, isPending } = useSubmitLead();
  const [done, setDone] = useState(false);

  const submitLabel: Record<LeadVariant, string> = {
    brochure: tt("Nhận brochure", "Get brochure"),
    "khao-sat": tt("Gửi yêu cầu khảo sát", "Send visit request"),
    "tu-van": tt("Đăng ký tư vấn", "Register for consulting"),
    "lien-he": tt("Gửi liên hệ", "Send message"),
    "ung-tuyen": tt("Nộp hồ sơ", "Submit application"),
  };

  const needOptions = [
    { value: "thue-dat", label: tt("Thuê đất công nghiệp", "Lease industrial land") },
    { value: "thue-nha-xuong", label: tt("Thuê nhà xưởng xây sẵn", "Lease ready-built factory") },
    { value: "tu-van-chung", label: tt("Tư vấn chung", "General consultation") },
  ];

  const form = useForm<LeadInput>({
    resolver: zodResolver(LeadInput) as unknown as Resolver<LeadInput>,
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      need: "",
      message: "",
      ccnInterest: defaultCcnInterest ?? "",
      variant,
      source,
      consent: false,
    },
  });
  const { errors } = form.formState;

  const showCompany = variant !== "lien-he";
  const showCcnInterest = variant === "tu-van" || variant === "khao-sat";
  const showNeed = variant === "tu-van";
  const showMessage = variant !== "brochure";
  const messageLabel =
    variant === "ung-tuyen" ? tt("Thư giới thiệu", "Cover letter") : tt("Nội dung / nhu cầu", "Message / requirements");

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const res = await mutateAsync(values);
      setDone(true);
      toast.success(tt("Đã gửi thông tin. Sumita sẽ liên hệ sớm.", "Your information has been sent. Sumita will be in touch soon."));
      onSuccess?.(res, values);
    } catch {
      toast.error(tt("Gửi không thành công. Vui lòng thử lại.", "Submission failed. Please try again."));
    }
  });

  if (done) {
    return (
      <div className={cn("flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 text-center shadow-sm", className)}>
        <span className="flex size-11 items-center justify-center rounded-full bg-cta/10 text-cta">
          <Icon name="Check" className="size-5" />
        </span>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{tt("Đã gửi thông tin!", "Information sent!")}</p>
          <p className="text-sm text-muted-foreground">
            {tt(
              "Cảm ơn bạn đã quan tâm tới Sumita. Đội ngũ tư vấn sẽ liên hệ trong thời gian sớm nhất.",
              "Thank you for your interest in Sumita. Our advisory team will contact you shortly.",
            )}
          </p>
        </div>
        {successExtra}
      </div>
    );
  }

  return (
    // Input/Select cao 44px (dễ chạm trên mobile) — chỉ trong phạm vi form lead.
    <form
      onSubmit={onSubmit}
      className={cn(
        "space-y-4 [&_input]:h-11 [&_button[role=combobox]]:h-11 [&_textarea]:min-h-24",
        className,
      )}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={tt("Họ và tên", "Full name")} htmlFor="lead-name" required error={errors.name?.message}>
          <Input id="lead-name" autoComplete="name" placeholder={tt("Nguyễn Văn A", "John Smith")} {...form.register("name")} />
        </Field>
        {showCompany ? (
          <Field label={tt("Công ty", "Company")} htmlFor="lead-company" error={errors.company?.message}>
            <Input id="lead-company" autoComplete="organization" placeholder={tt("Tên doanh nghiệp", "Company name")} {...form.register("company")} />
          </Field>
        ) : null}
        <Field label="Email" htmlFor="lead-email" required error={errors.email?.message}>
          <Input id="lead-email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" {...form.register("email")} />
        </Field>
        <Field label={tt("Số điện thoại", "Phone number")} htmlFor="lead-phone" required error={errors.phone?.message}>
          <Input id="lead-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" {...form.register("phone")} />
        </Field>
      </div>

      {showCcnInterest ? (
        <Field label={tt("CCN quan tâm", "Cluster of interest")} htmlFor="lead-ccn" error={errors.ccnInterest?.message}>
          <Input id="lead-ccn" placeholder={tt("VD: CCN Hưng Nhân", "e.g. Hung Nhan Cluster")} {...form.register("ccnInterest")} />
        </Field>
      ) : null}

      {showNeed ? (
        <Field label={tt("Nhu cầu", "Need")} error={errors.need?.message}>
          <Controller
            control={form.control}
            name="need"
            render={({ field }) => (
              <Select value={field.value || undefined} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={tt("Chọn nhu cầu", "Select a need")} />
                </SelectTrigger>
                <SelectContent>
                  {needOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      ) : null}

      {showMessage ? (
        <Field label={messageLabel} htmlFor="lead-message" error={errors.message?.message}>
          <Textarea id="lead-message" rows={3} placeholder={tt("Mô tả ngắn nhu cầu của bạn…", "Briefly describe your requirements…")} {...form.register("message")} />
        </Field>
      ) : null}

      {variant === "ung-tuyen" ? (
        <p className="text-xs text-muted-foreground">
          {tt(
            "* Đính kèm CV: tính năng upload sẽ kích hoạt ở bản full-build. Tạm thời vui lòng ghi link CV trong phần thư giới thiệu.",
            "* CV attachment: the upload feature will be enabled in the full build. For now, please include a link to your CV in the cover letter.",
          )}
        </p>
      ) : null}

      <Controller
        control={form.control}
        name="consent"
        render={({ field }) => (
          <div className="space-y-1.5">
            <label className="flex items-start gap-2 text-sm">
              <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-0.5" />
              <span className="text-muted-foreground">
                {tt(
                  "Tôi đồng ý để Sumita liên hệ và xử lý thông tin theo Chính sách bảo mật (PDPD).",
                  "I agree to let Sumita contact me and process my information in accordance with the Privacy Policy (PDPD).",
                )}
              </span>
            </label>
            {errors.consent?.message ? <p className="text-xs text-destructive">{errors.consent.message}</p> : null}
          </div>
        )}
      />

      {/* Nút submit cao 44px (touch target chuẩn) — CTA chuyển đổi chính, không đổi button dùng chung. */}
      <Button type="submit" variant="cta" size="lg" className="h-11 w-full text-sm font-semibold" disabled={isPending}>
        {isPending ? <Icon name="Loader2" className="size-4 animate-spin" /> : null}
        {submitLabel[variant]}
      </Button>
    </form>
  );
}
