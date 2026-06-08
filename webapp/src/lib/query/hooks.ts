"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api";
import type { Doc, NewsCategory } from "@/lib/schema";
import { qk } from "./keys";

/* React Query hooks — UI chỉ dùng các hook này, không gọi api trực tiếp. */

export const useCcns = () => useQuery({ queryKey: qk.ccns, queryFn: api.getCcns });
export const useCcn = (slug: string) => useQuery({ queryKey: qk.ccn(slug), queryFn: () => api.getCcn(slug) });

export const useFactories = (ccnSlug?: string) =>
  useQuery({ queryKey: qk.factories(ccnSlug), queryFn: () => api.getFactories(ccnSlug) });

export const useNews = (category?: NewsCategory) =>
  useQuery({ queryKey: qk.news(category), queryFn: () => api.getNews(category) });
export const useNewsArticle = (slug: string) =>
  useQuery({ queryKey: qk.newsArticle(slug), queryFn: () => api.getNewsArticle(slug) });

export const useJobs = () => useQuery({ queryKey: qk.jobs, queryFn: api.getJobs });
export const useJob = (slug: string) => useQuery({ queryKey: qk.job(slug), queryFn: () => api.getJob(slug) });

export const useUtilityGroups = () => useQuery({ queryKey: qk.utilities, queryFn: api.getUtilityGroups });
export const useServices = () => useQuery({ queryKey: qk.services, queryFn: api.getServices });
export const usePartners = () => useQuery({ queryKey: qk.partners, queryFn: api.getPartners });
export const useMapPins = () => useQuery({ queryKey: qk.mapPins, queryFn: api.getMapPins });

export const useDocs = (opts?: { ccnSlug?: string; category?: Doc["category"] }) =>
  useQuery({ queryKey: qk.docs(opts), queryFn: () => api.getDocs(opts) });

export const useSearch = (q: string) =>
  useQuery({ queryKey: qk.search(q), queryFn: () => api.search(q), enabled: q.trim().length >= 2 });

export const useSubmitLead = () => useMutation({ mutationFn: api.submitLead });
