export type AnalyticsDateRange = {
  from: string;
  to: string;
  fromIso: string;
  toIso: string;
};

function isValidDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function toIsoStart(value: string) {
  return `${value}T00:00:00.000Z`;
}

function toIsoEnd(value: string) {
  return `${value}T23:59:59.999Z`;
}

function shiftDays(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function getAnalyticsDateRange(searchParams: URLSearchParams): AnalyticsDateRange {
  const rawFrom = (searchParams.get("from") ?? "").trim();
  const rawTo = (searchParams.get("to") ?? "").trim();

  const fallbackTo = shiftDays(0);
  const fallbackFrom = shiftDays(-29);

  const from = isValidDateOnly(rawFrom) ? rawFrom : fallbackFrom;
  const to = isValidDateOnly(rawTo) ? rawTo : fallbackTo;

  if (from > to) {
    return {
      from: to,
      to: from,
      fromIso: toIsoStart(to),
      toIso: toIsoEnd(from),
    };
  }

  return {
    from,
    to,
    fromIso: toIsoStart(from),
    toIso: toIsoEnd(to),
  };
}