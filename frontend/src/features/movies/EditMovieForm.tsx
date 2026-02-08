import { useEffect, useState } from "react";
import { http } from "../../api/http";
import { useStreamingSites } from "./useStreamingSite";
import StreamingSitesPicker from "./StreamingSitesPicker";
import type { MovieDetails } from "../../types/types";
import { toNullIfEmpty, isoToDateInput, dateInputToIso } from "../../utils/movieForm.utils";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import Checkbox from "../../components/UI/Checkbox";
import Button from "../../components/UI/Button";

export default function EditMovieForm({
  movieId,
  onSaved,
}: {
  movieId: number;
  onSaved: () => void;
}) {
  const sites = useStreamingSites();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    http.get<MovieDetails>(`/api/movies/${movieId}`).then((r) => setMovie(r.data));
  }, [movieId]);

  const canSave = !!movie?.name.trim();

  const setField = (key: keyof MovieDetails, value: any) => {
    setMovie((m) => (m ? { ...m, [key]: value } : m));
  };

  const toggleSite = (id: number) => {
    setMovie((m) => {
      if (!m) return m;

      const streamingSiteIds = m.streamingSiteIds.includes(id)
        ? m.streamingSiteIds.filter((x) => x !== id)
        : [...m.streamingSiteIds, id];

      return { ...m, streamingSiteIds };
    });
  };

  const save = async () => {
    if (!movie || !canSave) return;

    setSaving(true);
    try {
      const { id, ...rest } = movie;

      await http.put(`/api/movies/${movieId}`, {
        ...rest,
        name: movie.name.trim(),
        streamingSiteIds: [...new Set(movie.streamingSiteIds)],
      });

      onSaved();
    } finally {
      setSaving(false);
    }
  };

  if (!movie) return <div>Loading...</div>;

return (
  <div className="">
    <div className="grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2">
      <div>
        <label className="text-sm">Nazwa filmu</label>
        <Input
          placeholder="Wprowadź"
          value={movie.name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">Oryginalna nazwa filmu</label>
        <Input
          placeholder="Wprowadź"
          value={movie.originalTitle ?? ""}
          onChange={(e) =>
            setField("originalTitle", toNullIfEmpty(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Reżyser</label>
        <Input
          placeholder="Wprowadź"
          value={movie.director ?? ""}
          onChange={(e) =>
            setField("director", toNullIfEmpty(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Gatunek</label>
        <Input
          placeholder="Wprowadź"
          value={movie.genre ?? ""}
          onChange={(e) => setField("genre", toNullIfEmpty(e.target.value))}
        />
      </div>

      <div>
        <label className="text-sm">Język</label>
        <Input
          placeholder="Wprowadź"
          value={movie.language ?? ""}
          onChange={(e) =>
            setField("language", toNullIfEmpty(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Kraj</label>
        <Input
          placeholder="Country"
          value={movie.country ?? ""}
          onChange={(e) =>
            setField("country", toNullIfEmpty(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Kategoria wiekowa</label>
        <Input
          placeholder="Wprowadź"
          value={movie.ageRating ?? ""}
          onChange={(e) =>
            setField("ageRating", toNullIfEmpty(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Link do plakatu</label>
        <Input
          placeholder="Poster URL"
          value={movie.posterUrl ?? ""}
          onChange={(e) =>
            setField("posterUrl", toNullIfEmpty(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Data premiery</label>
        <Input
          type="date"
          value={isoToDateInput(movie.releaseDate)}
          onChange={(e) =>
            setField("releaseDate", dateInputToIso(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Czas trwania filmu (min.)</label>
        <Input
          type="number"
          min={1}
          value={movie.durationMinutes}
          onChange={(e) =>
            setField("durationMinutes", Number(e.target.value))
          }
        />
      </div>

      <div>
        <label className="text-sm">Ocena (0-10)</label>
        <Input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={movie.score}
          onChange={(e) => setField("score", Number(e.target.value))}
        />
      </div>
    </div>

    <div className="mt-4">
      <label className="text-sm">Opis filmu</label>
      <Textarea
        placeholder="Opis"
        value={movie.description ?? ""}
        onChange={(e) =>
          setField("description", toNullIfEmpty(e.target.value))
        }
      />
    </div>

    <div className="mt-1">
      <label className="text-sm block mb-2">
        Czy film jest dostępny?
      </label>
      <Checkbox
        checked={movie.isAvailable}
        onChange={(e) => setField("isAvailable", e.target.checked)}
      />
    </div>

    <div className="mb-4">
      <StreamingSitesPicker
        sites={sites}
        selectedIds={movie.streamingSiteIds}
        onToggle={toggleSite}
      />
    </div>

    <div className="flex justify-end">
      <Button disabled={saving || !canSave} onClick={save}>
        {saving ? "Saving..." : "Zapisz"}
      </Button>
    </div>
  </div>
);
}