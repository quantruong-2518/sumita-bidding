"use client";

import { useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LeadInput, type LeadVariant } from "@/lib/schema";
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

const SUBMIT_LABEL: Record<LeadVariant, string> = {
  brochure: "Nhận brochure",
  "khao-sat": "Gửi yêu cầu khảo sát",
  "tu-van": "Đăng ký tư vấn",
  "lien-he": "Gửi liên hệ",
  "ung-tuyen": "Nộp hồ sơ",
};

const NEED_OPTIONS = [
  { value: "thue-dat", label: "Thuê đất công nghiệp" },
  { value: "thue-nha-xuong", label: "Thuê nhà xưởng xây sẵn" },
  { value: "tu-van-chung", label: "Tư vấn chung" },
];

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
  const { mutateAsync, isPending } = useSubmitLead();
  const [done, setDone] = useState(false);

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
  const messageLabel = variant === "ung-tuyen" ? "Thư giới thiệu" : "Nội dung / nhu cầu";

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const res = await mutateAsync(values);
      setDone(true);
      toast.success("Đã gửi thông tin. Sumita sẽ liên hệ sớm.");
      onSuccess?.(res, values);
    } catch {
      toast.error("Gửi không thành công. Vui lòng thử lại.");
    }
  });

  if (done) {
    return (
      <div className={cn("flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 text-center shadow-sm", className)}>
        <span className="flex size-11 items-center justify-center rounded-full bg-cta/10 text-cta">
          <Icon name="Check" className="size-5" />
        </span>
        <div className="space-y-1">
          <p className="text-lg font-semibold">Đã gửi thông tin!</p>
          <p className="text-sm text-muted-foreground">
            Cảm ơn bạn đã quan tâm tới Sumita. Đội ngũ tư vấn sẽ liên hệ trong thời gian sớm nhất.
          </p>
        </div>
        {successExtra}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Họ và tên" htmlFor="lead-name" required error={errors.name?.message}>
          <Input id="lead-name" placeholder="Nguyễn Văn A" {...form.register("name")} />
        </Field>
        {showCompany ? (
          <Field label="Công ty" htmlFor="lead-company" error={errors.company?.message}>
            <Input id="lead-company" placeholder="Tên doanh nghiệp" {...form.register("company")} />
          </Field>
        ) : null}
        <Field label="Email" htmlFor="lead-email" required error={errors.email?.message}>
          <Input id="lead-email" type="email" placeholder="ban@congty.com" {...form.register("email")} />
        </Field>
        <Field label="Số điện thoại" htmlFor="lead-phone" required error={errors.phone?.message}>
          <Input id="lead-phone" type="tel" placeholder="09xx xxx xxx" {...form.register("phone")} />
        </Field>
      </div>

      {showCcnInterest ? (
        <Field label="CCN quan tâm" htmlFor="lead-ccn" error={errors.ccnInterest?.message}>
          <Input id="lead-ccn" placeholder="VD: CCN Hưng Nhân" {...form.register("ccnInterest")} />
        </Field>
      ) : null}

      {showNeed ? (
        <Field label="Nhu cầu" error={errors.need?.message}>
          <Controller
            control={form.control}
            name="need"
            render={({ field }) => (
              <Select value={field.value || undefined} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn nhu cầu" />
                </SelectTrigger>
                <SelectContent>
                  {NEED_OPTIONS.map((o) => (
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
          <Textarea id="lead-message" rows={3} placeholder="Mô tả ngắn nhu cầu của bạn…" {...form.register("message")} />
        </Field>
      ) : null}

      {variant === "ung-tuyen" ? (
        <p className="text-xs text-muted-foreground">
          * Đính kèm CV: tính năng upload sẽ kích hoạt ở bản full-build. Tạm thời vui lòng ghi link CV trong phần thư giới thiệu.
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
                Tôi đồng ý để Sumita liên hệ và xử lý thông tin theo Chính sách bảo mật (PDPD).
              </span>
            </label>
            {errors.consent?.message ? <p className="text-xs text-destructive">{errors.consent.message}</p> : null}
          </div>
        )}
      />

      <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isPending}>
        {isPending ? <Icon name="Loader2" className="size-4 animate-spin" /> : null}
        {SUBMIT_LABEL[variant]}
      </Button>
    </form>
  );
}
