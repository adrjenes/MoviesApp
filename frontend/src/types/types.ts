export type StreamingSite = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  name: string;
  description: string | null;
  score: number;
  releaseDate: string;
  durationMinutes: number;
  genre: string | null;
  director: string | null;
  ageRating: string | null;
  posterUrl: string | null;
  isAvailable: boolean;
  streamingSites: StreamingSite[];
};

export type MovieDetails = {
  id: number;
  name: string;
  originalTitle: string | null;
  description: string | null;
  score: number;
  releaseDate: string;
  durationMinutes: number;
  genre: string | null;
  director: string | null;
  language: string | null;
  country: string | null;
  ageRating: string | null;
  posterUrl: string | null;
  isAvailable: boolean;
  streamingSiteIds: number[];
};

export type CreateMoviePayload = Omit<MovieDetails, "id">;
export type UpdateMoviePayload = Omit<MovieDetails, "id">; 