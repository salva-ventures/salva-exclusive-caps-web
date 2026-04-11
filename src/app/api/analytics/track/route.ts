import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedEventTypes = new Set([
  "page_view",
  "catalog_view",
  "product_view",
  "search_performed",
  "filter_applied",
  "contact_click_whatsapp",
  "contact_click_instagram",
  "contact_click_facebook",
  "cta_clicked",
]);

const allowedEntityTypes = new Set(["page", "catalog", "product", "channel", "cta"]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().slice(0, maxLength);
  return cleaned || null;
}

function cleanUuid(value: unknown) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned || null;
}

function cleanNumber(value: unknown) {
  if (typeof value !== "number") return null;
  if (!Number.isFinite(value)) return null;
  return value;
}

function cleanObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const eventType = cleanText(body.eventType, 80);
  const entityType = cleanText(body.entityType, 40);

  if (!eventType || !allowedEventTypes.has(eventType)) {
    return NextResponse.json({ error: "Tipo de evento inválido." }, { status: 400 });
  }

  if (entityType && !allowedEntityTypes.has(entityType)) {
    return NextResponse.json({ error: "Tipo de entidad inválido." }, { status: 400 });
  }

  const payload = {
    p_customer_id: authData.user?.id ?? null,
    p_event_type: eventType,
    p_session_id: cleanText(body.sessionId, 120),
    p_anonymous_id: cleanText(body.anonymousId, 120),
    p_page_path: cleanText(body.pagePath, 200),
    p_page_title: cleanText(body.pageTitle, 160),
    p_source: cleanText(body.source, 100),
    p_medium: cleanText(body.medium, 100),
    p_campaign: cleanText(body.campaign, 150),
    p_referrer: cleanText(body.referrer, 300),
    p_device_type: cleanText(body.deviceType, 30),
    p_country_code: cleanText(body.countryCode, 8),
    p_ip_country_code: cleanText(body.ipCountryCode, 8),
    p_entity_type: entityType,
    p_entity_id: cleanUuid(body.entityId),
    p_entity_slug: cleanText(body.entitySlug, 160),
    p_search_query: cleanText(body.searchQuery, 200),
    p_event_value: cleanNumber(body.eventValue),
    p_filter_payload: cleanObject(body.filterPayload),
    p_event_data: cleanObject(body.eventData),
    p_utm_source: cleanText(body.utmSource, 100),
    p_utm_medium: cleanText(body.utmMedium, 100),
    p_utm_campaign: cleanText(body.utmCampaign, 150),
  };

  const { error } = await supabase.rpc("track_customer_event_v2", payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}