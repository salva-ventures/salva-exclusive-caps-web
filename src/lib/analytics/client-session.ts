const SESSION_KEY = "salva_session_id";
const ANON_KEY = "salva_anonymous_id";

function createId(prefix: string) {
  const random = Math.random().toString(36).slice(2);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${random}`;
}

export function getOrCreateSessionId() {
  if (typeof window === "undefined") return null;

  const current = window.sessionStorage.getItem(SESSION_KEY);
  if (current) return current;

  const created = createId("sess");
  window.sessionStorage.setItem(SESSION_KEY, created);
  return created;
}

export function getOrCreateAnonymousId() {
  if (typeof window === "undefined") return null;

  const current = window.localStorage.getItem(ANON_KEY);
  if (current) return current;

  const created = createId("anon");
  window.localStorage.setItem(ANON_KEY, created);
  return created;
}

export function getUtmParams() {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
}