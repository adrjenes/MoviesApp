import { useState } from "react";
import { http } from "../../api/http";

import { useStreamingSites } from "./useStreamingSites";
import StreamingSitesPicker from "./StreamingSitesPicker";

export default function AddMovieForm({ onCreated }: { onCreated: () => void }) {
  const sites = useStreamingSites();

  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const canSave = name.trim().length > 0;

  const toggleSite = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const save = async () => {
    if (!canSave) return;

    const form = new FormData();

    form.append("name", name.trim());
    form.append("originalTitle", "");
    form.append("description", "");
    form.append("score", "8");
    form.append("releaseDate", new Date().toISOString());
    form.append("durationMinutes", "120");
    form.append("genre", "");
    form.append("director", "");
    form.append("language", "");
    form.append("country", "");
    form.append("ageRating", "");
    form.append("isAvailable", "true");

    selectedIds.forEach((id) =>
      form.append("streamingSiteIds", String(id))
    );

    if (posterFile) {
      form.append("poster", posterFile);
    }

    await http.post("/api/movies", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setName("");
    setSelectedIds([]);
    setPosterFile(null);
    onCreated();
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <input
        className="border w-full p-2 rounded"
        placeholder="Movie name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* UPLOAD PLAKATU */}
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => setPosterFile(e.target.files?.[0] ?? null)}
        className="border w-full p-2 rounded"
      />

      <StreamingSitesPicker
        sites={sites}
        selectedIds={selectedIds}
        onToggle={toggleSite}
      />

      <button
        className="bg-black text-white px-3 py-2 rounded disabled:opacity-60"
        disabled={!canSave}
        onClick={save}
      >
        Save
      </button>
    </div>
  );
}