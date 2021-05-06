import { SearchData } from '@/interfaces';
import { SearchResult } from '@/store/movies/interfaces';

export const mapSearchData = (result: SearchResult): SearchData => {
  return {
    movieList: result.data.map((movie) => ({
      id: movie.id,
      name: movie.title,
      genre: movie.genres?.join(', '),
      year: movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : null,
      poster: movie.poster_path,
    })),
    offset: result.offset,
    totalAmount: result.totalAmount,
  };
};
