"use client";

import { trackClientEvent } from "@/lib/analytics/track-client";

export function trackWhatsAppClick(context?: Record<string, unknown>) {
  return trackClientEvent({
    eventType: "contact_click_whatsapp",
    entityType: "channel",
    entitySlug: "whatsapp",
    eventData: context ?? {},
  });
}

export function trackInstagramClick(context?: Record<string, unknown>) {
  return trackClientEvent({
    eventType: "contact_click_instagram",
    entityType: "channel",
    entitySlug: "instagram",
    eventData: context ?? {},
  });
}

export function trackFacebookClick(context?: Record<string, unknown>) {
  return trackClientEvent({
    eventType: "contact_click_facebook",
    entityType: "channel",
    entitySlug: "facebook",
    eventData: context ?? {},
  });
}