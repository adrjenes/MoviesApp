export const toNullIfEmpty = (v: string): string | null => {
  const t = v.trim();
  return t.length ? t : null;
};

export const isoToDateInput = (iso: string): string => {
  return iso.slice(0, 10);
};

export const dateInputToIso = (d: string): string => {
  return new Date(d + "T00:00:00.000Z").toISOString();
};