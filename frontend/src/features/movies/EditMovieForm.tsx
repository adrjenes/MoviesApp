import { useEffect, useState } from "react";
import { http } from "../../api/http";
import type { MovieDetails } from "../../types/types";
import { useStreamingSites } from "./useStreamingSites";
import StreamingSitesPicker from "./StreamingSitesPicker";

const isoToDateInput = (iso: string) => iso.slice(0, 10);
const dateInputToIso = (d: string) => new Date(d).toISOString();

export default function EditMovieForm({ movieId, onSaved }: { movieId: number; onSaved: () => void;}) {
  const sites = useStreamingSites();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    http.get<MovieDetails>(`/api/movies/${movieId}`).then((r) => setMovie(r.data));
  }, [movieId]);

  const toggleSite = (id: number) => {
    if (!movie) return;
    const ids = movie.streamingSiteIds.includes(id)
      ? movie.streamingSiteIds.filter((x) => x !== id)
      : [...movie.streamingSiteIds, id];
    setMovie({ ...movie, streamingSiteIds: ids });
  };

  const save = async () => {
    if (!movie) return;
    setSaving(true);
    try {
      const { id, ...payload } = movie;
      await http.put(`/api/movies/${movieId}`, payload);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="text-sm">Name</label>
          <input
            className="border w-full p-2 rounded"
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">Score</label>
          <input
            className="border w-full p-2 rounded"
            type="number"
            step="0.1"
            value={movie.score}
            onChange={(e) => setMovie({ ...movie, score: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="text-sm">Duration (min)</label>
          <input
            className="border w-full p-2 rounded"
            type="number"
            value={movie.durationMinutes}
            onChange={(e) =>
              setMovie({ ...movie, durationMinutes: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label className="text-sm">Release date</label>
          <input
            className="border w-full p-2 rounded"
            type="date"
            value={isoToDateInput(movie.releaseDate)}
            onChange={(e) =>
              setMovie({ ...movie, releaseDate: dateInputToIso(e.target.value) })
            }
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={movie.isAvailable}
            onChange={(e) => setMovie({ ...movie, isAvailable: e.target.checked })}
          />
          Available
        </label>
      </div>

      <StreamingSitesPicker
        sites={sites}
        selectedIds={movie.streamingSiteIds}
        onToggle={toggleSite}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={saving}
        onClick={save}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}