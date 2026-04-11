"use client";

import { usePageView } from "@/lib/analytics/use-page-view";

export default function PageViewTracker({
  pagePath,
  pageTitle,
  entitySlug,
}: {
  pagePath: string;
  pageTitle: string;
  entitySlug?: string | null;
}) {
  usePageView({
    pagePath,
    pageTitle,
    entitySlug: entitySlug ?? pagePath,
  });

  return null;
}