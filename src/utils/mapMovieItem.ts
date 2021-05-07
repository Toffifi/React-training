import { Movie } from '@/interfaces';
import { SearchResultItem } from '@/store/movies/interfaces';

export const mapMovieItem = (data: Movie, id = 0): SearchResultItem => {
  const result = {
    title: data.name,
    genres: data.genre.split(', '),
    release_date: data.releaseDate,
    poster_path: data.poster,
    overview: data.overview,
    runtime: data.runtime,
  };

  return id ? { ...result, id } : result;
};
