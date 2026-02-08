export const API = "https://localhost:7026/api";

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}