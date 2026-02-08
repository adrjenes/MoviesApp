import { useState } from "react";
import { http } from "../../api/http";
import StreamingSitesPicker from "./StreamingSitesPicker";
import { useStreamingSites } from "./useStreamingSite";
import type { CreateMoviePayload } from "../../types/types";
import { toNullIfEmpty, dateInputToIso } from "../../utils/movieForm.utils";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import Checkbox from "../../components/UI/Checkbox";
import Button from "../../components/UI/Button";

const emptyMovie = (): CreateMoviePayload => ({
  name: "",
  originalTitle: null,
  description: null,
  score: 8,
  releaseDate: new Date().toISOString().slice(0, 10),
  durationMinutes: 120,
  genre: null,
  director: null,
  language: null,
  country: null,
  ageRating: null,
  posterUrl: null,
  isAvailable: true,
  streamingSiteIds: [],
});

export default function AddMovieForm({ onCreated }: { onCreated: () => void }) {
  const sites = useStreamingSites();
  const [movie, setMovie] = useState<CreateMoviePayload>(() => emptyMovie());

  const canSave = !!movie.name.trim();

  const setField = (key: keyof CreateMoviePayload, value: any) => {
    setMovie((m) => ({ ...m, [key]: value }));
  };

  const toggleSite = (id: number) => {
    setMovie((m) => ({
      ...m,
      streamingSiteIds: m.streamingSiteIds.includes(id)
        ? m.streamingSiteIds.filter((x) => x !== id)
        : [...m.streamingSiteIds, id],
    }));
  };

  const save = async () => {
    if (!canSave) return;

    await http.post("/api/movies", {
      ...movie,
      name: movie.name.trim(),
      releaseDate: dateInputToIso(movie.releaseDate),
      streamingSiteIds: [...new Set(movie.streamingSiteIds)],
    });

    setMovie(emptyMovie());
    onCreated();
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
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
            onChange={(e) => setField("director", toNullIfEmpty(e.target.value))}
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
            onChange={(e) => setField("language", toNullIfEmpty(e.target.value))}
          />
        </div>

        <div>
          <label className="text-sm">Kraj</label>
          <Input
            placeholder="Country"
            value={movie.country ?? ""}
            onChange={(e) => setField("country", toNullIfEmpty(e.target.value))}
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
            onChange={(e) => setField("posterUrl", toNullIfEmpty(e.target.value))}
          />
        </div>

        <div>
          <label className="text-sm">Data premiery</label>
          <Input
            className="w-full rounded border p-2"
            type="date"
            value={movie.releaseDate}
            onChange={(e) => setField("releaseDate", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Czas trwania filmu (min.)</label>
          <Input
            className="w-full rounded border p-2"
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
            className="w-full rounded border p-2"
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
          onChange={(e) => setField("description", toNullIfEmpty(e.target.value))}
        />
      </div>

      <div className="mt-1">
        <label className="mb-2 block text-sm">Czy film jest dostępny?</label>
        <Checkbox
          className="block"
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
        <Button
          className="rounded bg-black px-3 py-2 text-white disabled:opacity-60"
          disabled={!canSave}
          onClick={save}
        >
          Zapisz
        </Button>
      </div>
    </div>
  );
}