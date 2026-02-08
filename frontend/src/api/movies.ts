import { getJson } from "./base";

export const getMovies = () => getJson<any[]>("/movies");