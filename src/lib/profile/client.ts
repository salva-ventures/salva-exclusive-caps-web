export type AcquisitionSourceOption = {
  code: string;
  label: string;
  sort_order: number;
};

export type InterestOption = {
  code: string;
  label: string;
  category: string | null;
  sort_order: number;
};

export async function fetchAcquisitionSources(): Promise<AcquisitionSourceOption[]> {
  const response = await fetch("/api/profile/acquisition-sources", { cache: "no-store" });
  if (!response.ok) throw new Error("No se pudieron cargar las fuentes");
  const json = await response.json();
  return json.sources ?? [];
}

export async function fetchInterestOptions(): Promise<InterestOption[]> {
  const response = await fetch("/api/profile/interests", { cache: "no-store" });
  if (!response.ok) throw new Error("No se pudieron cargar los intereses");
  const json = await response.json();
  return json.interests ?? [];
}