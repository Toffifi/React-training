import { SearchData } from '@/interfaces';
import { SearchResult } from '@/store/movies/interfaces';

export const mapSearchData = (result: SearchResult): SearchData => {
  return {
    movieList: result.data.map((movie) => ({
      id: movie.id,
      name: movie.title,
      genre: movie.genres?.join(', '),
      releaseDate: movie.release_date,
      poster: movie.poster_path,
      overview: movie.overview,
      runtime: movie.runtime,
    })),
    offset: result.offset,
    totalAmount: result.totalAmount,
  };
};
