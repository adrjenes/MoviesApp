import { useEffect, useState } from "react";
import { http } from "../../api/http";
import type { StreamingSite } from "../../types/types";


export function useStreamingSites() {
  const [sites, setSites] = useState<StreamingSite[]>([]);

  useEffect(() => {
    http.get<StreamingSite[]>("/api/streaming-sites").then((r) => setSites(r.data));
  }, []);

  return sites;
}