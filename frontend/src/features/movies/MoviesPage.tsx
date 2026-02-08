import { useEffect, useState } from "react";
import { http } from "../../api/http";
import AddMovieForm from "./AddMovieForm";
import EditMovieForm from "./EditMovieForm";
import Modal from "../../components/UI/Modal";
import type { Movie } from "../../types/types";
import Button from "../../components/UI/Button";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      setMovies((await http.get<Movie[]>("/api/movies")).data);
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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div >
      <header className="flex justify-center items-center font-bold gap-6 h-20 text-4xl text-[rgb(242,91,44)] bg-[rgb(38,34,98)] ">
        MoviesApp
        <Button onClick={() => setAddOpen(true)}>
          Add Movie
        </Button>
      </header>
      <div className="flex">
        <h1 className="text-4xl font-semibold text-[rgb(233,78,27)] ">Movies</h1>
        
      </div>

      <div className="space-y-3 p-6">
  {movies.map((m) => (
    <div
      key={m.id}
      onClick={() => setEditId(m.id)}
      className=" grid grid-cols-3 gap-4 border rounded p-4 cursor-pointer hover:bg-gray-50 transition-colors">
      {/* LEWA DUŻA KOLUMNA */}
      <div className="col-span-2">
        <div className="font-semibold text-lg">{m.name}</div>

        <div className="text-sm opacity-70 mt-1">
          Ocena: {m.score} • {m.durationMinutes} min •{" "}
          {m.isAvailable ? "Available" : "Not available"}
        </div>

        <div className="text-sm mt-1">
          Dostępne na:{" "}
          {m.streamingSites.length ? m.streamingSites.map((s) => s.name).join(", ") : "-"}
        </div>
        <div className="text-sm opacity-70 mt-1"> Data premiery: {m.releaseDate.slice(0,10)}</div>
        <div className="text-sm opacity-70 mt-1"> Gatunek: {m.genre}</div>
        <div className="text-sm opacity-70 mt-1"> Reżyser: {m.director}</div>
        <div className="text-sm opacity-70 mt-1"> Klasyfikacja wiekowa: {m.director}</div>
        <div className="text-sm opacity-70 mt-1"> {m.posterUrl}</div>
      </div>

      {/* PRAWA KOLUMNA — DESCRIPTION */}
      <div className="text-sm opacity-80 border-l pl-4">
        {m.description ?? "Brak opisu"}
      </div>
    </div>
  ))}
</div>

      <Modal open={addOpen} title="Add Movie" onClose={() => setAddOpen(false)}>
        <AddMovieForm onCreated={afterChange} />
      </Modal>

      <Modal open={editId !== null} title="Edit Movie" onClose={() => setEditId(null)}>
        {editId !== null && <EditMovieForm movieId={editId} onSaved={afterChange} />}
      </Modal>
    </div>
  );
}