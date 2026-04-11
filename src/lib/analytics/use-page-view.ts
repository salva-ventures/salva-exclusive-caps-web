"use client";

import { useEffect } from "react";
import { trackClientEvent } from "@/lib/analytics/track-client";

type UsePageViewArgs = {
  pagePath?: string;
  pageTitle?: string;
  entitySlug?: string | null;
};

export function usePageView(args?: UsePageViewArgs) {
  useEffect(() => {
    trackClientEvent({
      eventType: "page_view",
      entityType: "page",
      pagePath: args?.pagePath ?? window.location.pathname,
      pageTitle: args?.pageTitle ?? document.title,
      entitySlug: args?.entitySlug ?? window.location.pathname,
    });
  }, [args?.entitySlug, args?.pagePath, args?.pageTitle]);
}