export type GeoCountry = {
  code: string;
  name: string;
  phone_code: string;
};

export type GeoState = {
  id: string;
  code: string | null;
  name: string;
};

export type GeoCity = {
  id: string;
  name: string;
};

export async function fetchCountries(): Promise<GeoCountry[]> {
  const response = await fetch("/api/geo/countries", { cache: "no-store" });
  if (!response.ok) throw new Error("No se pudieron cargar los países");
  const json = await response.json();
  return json.countries ?? [];
}

export async function fetchStates(countryCode: string): Promise<GeoState[]> {
  if (!countryCode) return [];
  const response = await fetch(`/api/geo/states?country_code=${encodeURIComponent(countryCode)}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("No se pudieron cargar los estados");
  const json = await response.json();
  return json.states ?? [];
}

export async function fetchCities(stateId: string): Promise<GeoCity[]> {
  if (!stateId) return [];
  const response = await fetch(`/api/geo/cities?state_id=${encodeURIComponent(stateId)}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("No se pudieron cargar las ciudades");
  const json = await response.json();
  return json.cities ?? [];
}