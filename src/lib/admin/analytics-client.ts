export async function fetchAdminAnalyticsJson<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error cargando ${path}`);
  }

  return response.json() as Promise<T>;
}

export type AnalyticsOverview = {
  total_customers: number;
  active_customers: number;
  verified_customers: number;
  customers_with_login: number;
  completed_profiles: number;
  marketing_opt_in_customers: number;
  avg_profile_completion_percent: number;
  active_last_7d: number;
  active_last_30d: number;
};

export type RegistrationRow = {
  day: string;
  registrations: number;
  verified_registrations: number;
  marketing_opt_in_registrations: number;
};

export type ActivityRow = {
  day: string;
  logins: number;
  unique_login_customers: number;
  profile_updates: number;
  password_changes: number;
  registrations_from_events: number;
};

export type FunnelRow = {
  stage: string;
  total: number;
};

export type AcquisitionRow = {
  code: string;
  label: string;
  sort_order: number;
  total_customers: number;
  verified_customers: number;
  completed_profiles: number;
  active_last_30d: number;
};

export type InterestRow = {
  code: string;
  label: string;
  category: string | null;
  sort_order: number;
  total_customers: number;
  active_last_30d: number;
};

export type EventTypeRow = {
  event_type: string;
  total_events: number;
  unique_customers: number;
  first_event_at: string | null;
  last_event_at: string | null;
};

export type RecentEventRow = {
  id: string;
  event_timestamp: string;
  event_type: string;
  customer_id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  customer_type: string | null;
  page_path: string | null;
  event_data: Record<string, unknown> | null;
};

export type RecentlyActiveCustomerRow = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  customer_type: string | null;
  profile_completion_percent: number | null;
  email_verified_at: string | null;
  last_login_at: string | null;
  last_seen_at: string | null;
  profile_completed_at: string | null;
  acquisition_source: string | null;
  country_code: string | null;
};

export type TopProductRow = {
  entity_slug: string | null;
  total_events: number;
};

export type SearchTermRow = {
  search_query: string | null;
  total_searches: number;
};

export type TopCatalogRow = {
  entity_slug: string | null;
  total_events: number;
};

export type IntentScoreRow = {
  customer_id: string;
  commercial_intent_score: number;
  commercial_intent_level: "low" | "medium" | "high";
  total_scored_events: number;
  catalog_views: number;
  product_views: number;
  searches: number;
  filters: number;
  cta_clicks: number;
  whatsapp_clicks: number;
  menudeo_events: number;
  mayoreo_events: number;
  dominant_catalog: string | null;
  unique_sessions: number;
  first_activity_at: string | null;
  last_activity_at: string | null;
};

export type CommercialSegmentRow = {
  customer_id: string;
  commercial_intent_score: number;
  commercial_intent_level: "low" | "medium" | "high";
  dominant_catalog: string | null;
  total_scored_events: number;
  catalog_views: number;
  product_views: number;
  searches: number;
  filters: number;
  cta_clicks: number;
  whatsapp_clicks: number;
  unique_sessions: number;
  first_activity_at: string | null;
  last_activity_at: string | null;
  customer_type: string | null;
  profile_completion_percent: number | null;
  accepted_marketing: boolean | null;
  preferred_contact_channel: string | null;
  acquisition_source: string | null;
  first_seen_at: string | null;
  last_seen_at: string | null;
  profile_completed_at: string | null;
  is_active: boolean | null;
  segment_code: string;
  segment_label: string;
};

export type ProductDemandRow = {
  entity_id: string | null;
  entity_slug: string | null;
  product_views: number;
  unique_customers: number;
  unique_sessions: number;
  product_views_7d: number;
  product_views_30d: number;
  menudeo_views: number;
  mayoreo_views: number;
  dominant_catalog: string | null;
  first_event_at: string | null;
  last_event_at: string | null;
  recent_interest_ratio_pct: number;
};

export type SearchOpportunityRow = {
  search_query_normalized: string;
  search_query_sample: string | null;
  total_searches: number;
  unique_customers: number;
  unique_sessions: number;
  menudeo_searches: number;
  mayoreo_searches: number;
  dominant_catalog: string | null;
  product_views_after_search: number;
  search_to_product_view_rate_pct: number;
  opportunity_code: string;
  opportunity_label: string;
  first_search_at: string | null;
  last_search_at: string | null;
};
