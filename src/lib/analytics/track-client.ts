import { getOrCreateAnonymousId, getOrCreateSessionId, getUtmParams } from "@/lib/analytics/client-session";

export type TrackClientPayload = {
  eventType: string;
  pagePath?: string | null;
  pageTitle?: string | null;
  entityType?: "page" | "catalog" | "product" | "channel" | "cta" | null;
  entityId?: string | null;
  entitySlug?: string | null;
  searchQuery?: string | null;
  eventValue?: number | null;
  filterPayload?: Record<string, unknown> | null;
  eventData?: Record<string, unknown> | null;
};

function normalizeText(value: string | null | undefined, maxLength: number) {
  if (!value) return null;
  return value.trim().slice(0, maxLength);
}

export async function trackClientEvent(payload: TrackClientPayload) {
  if (typeof window === "undefined") return;

  try {
    const sessionId = getOrCreateSessionId();
    const anonymousId = getOrCreateAnonymousId();
    const utm = getUtmParams();

    await fetch("/api/analytics/track", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType: payload.eventType,
        sessionId,
        anonymousId,
        pagePath: normalizeText(payload.pagePath ?? window.location.pathname, 200),
        pageTitle: normalizeText(payload.pageTitle ?? document.title, 160),
        referrer: normalizeText(document.referrer || null, 300),
        deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
        entityType: payload.entityType ?? null,
        entityId: payload.entityId ?? null,
        entitySlug: normalizeText(payload.entitySlug, 160),
        searchQuery: normalizeText(payload.searchQuery, 200),
        eventValue: payload.eventValue ?? null,
        filterPayload: payload.filterPayload ?? {},
        eventData: payload.eventData ?? {},
        utmSource: utm.utm_source,
        utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign,
      }),
    });
  } catch (error) {
    console.error("trackClientEvent error:", error);
  }
}