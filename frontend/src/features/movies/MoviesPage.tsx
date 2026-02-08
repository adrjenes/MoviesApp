import { useEffect, useState } from "react";
import { http } from "../../api/http";
import AddMovieForm from "./AddMovieForm";
import EditMovieForm from "./EditMovieForm";
import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import type { Movie } from "../../types/types";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await http.get<Movie[]>("/api/movies");
      setMovies(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const afterChange = () => {
    setAddOpen(false);
    setEditId(null);
    refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-[rgb(38,34,98)] text-white shadow">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="text-xl font-extrabold tracking-tight">
              Movies<span className="text-[rgb(242,91,44)]">App</span>
            </div>
            <div className="hidden text-sm opacity-80 sm:block">
              aplikacja rekrutacyjna
            </div>
          </div>

          <Button onClick={() => setAddOpen(true)}>Dodaj film</Button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Zarządzaj listą filmów</h1>

       
        </div>

        {/* LIST */}
        {loading && (
          <div className="rounded-xl border bg-white p-4 text-slate-700 shadow-sm">
            Ładowanie filmów...
          </div>
        )}

        {!loading && movies.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-slate-700 shadow-sm">
            Brak filmów. Kliknij <span className="font-semibold">Dodaj film</span>.
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="space-y-3">
            {movies.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setEditId(m.id)}
                className="w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-[1px] hover:shadow-[0_0_0_3px_rgba(242,91,44,0.35)] "
              >
                {/* TOP LINE */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-lg font-extrabold text-[rgb(38,34,98)]">
                    {m.name}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold">
                      ⭐ {m.score}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold">
                      ⏱ {m.durationMinutes} min
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 font-semibold ${
                        m.isAvailable
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {m.isAvailable ? "Dostępny" : "Niedostępny"}
                    </span>
                  </div>
                </div>

                {/* BODY: 2 columns */}
                <div className="mt-3 grid gap-4 md:grid-cols-[1fr_1.4fr]">
                  {/* LEFT (meta) */}
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-sm">
                      <div className="flex gap-2">
                        <span className="w-28 shrink-0 font-semibold">Dostępne:</span>
                        <span className="font-semibold">
                          {m.streamingSites.length
                            ? m.streamingSites.map((s) => s.name).join(", ")
                            : "-"}
                        </span>
                      </div>

                      <div className="mt-2 flex gap-2">
                        <span className="w-28 shrink-0 font-semibold">Premiera:</span>
                        <span className="font-semibold">{m.releaseDate.slice(0, 10)}</span>
                      </div>

                      <div className="mt-2 flex gap-2">
                        <span className="w-28 shrink-0 font-semibold">Gatunek:</span>
                        <span className="font-semibold">{m.genre ?? "-"}</span>
                      </div>

                      <div className="mt-2 flex gap-2">
                        <span className="w-28 shrink-0 font-semibold">Reżyser:</span>
                        <span className="font-semibold">{m.director ?? "-"}</span>
                      </div>

                      <div className="mt-2 flex gap-2">
                        <span className="w-28 shrink-0 font-semibold">Wiek:</span>
                        <span className="font-semibold">{m.ageRating ?? "-"}</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT (description) */}
                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wide">
                      Opis
                    </div>
                    <div className="text-sm leading-6">
                      {m.description?.trim() ? m.description : "Brak opisu"}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs">
                  Kliknij, aby edytować
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* MODALS */}
      <Modal open={addOpen} title="Dodaj film" onClose={() => setAddOpen(false)}>
        <AddMovieForm onCreated={afterChange} />
      </Modal>

      <Modal
        open={editId !== null}
        title="Edit Movie"
        onClose={() => setEditId(null)}
      >
        {editId !== null && (
          <EditMovieForm movieId={editId} onSaved={afterChange} />
        )}
      </Modal>
    </div>
  );
}