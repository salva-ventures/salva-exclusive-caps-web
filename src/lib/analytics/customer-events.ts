import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CustomerEventPayload = {
  eventType: string;
  customerId?: string | null;
  pagePath?: string | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  referrer?: string | null;
  deviceType?: string | null;
  countryCode?: string | null;
  eventData?: Record<string, unknown> | null;
};

export async function trackCustomerEvent(payload: CustomerEventPayload) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.rpc("track_customer_event", {
    p_customer_id: payload.customerId ?? null,
    p_event_type: payload.eventType,
    p_page_path: payload.pagePath ?? null,
    p_source: payload.source ?? null,
    p_medium: payload.medium ?? null,
    p_campaign: payload.campaign ?? null,
    p_referrer: payload.referrer ?? null,
    p_device_type: payload.deviceType ?? null,
    p_country_code: payload.countryCode ?? null,
    p_event_data: payload.eventData ?? {},
  });

  if (error) {
    console.error("trackCustomerEvent error:", error);
  }
}