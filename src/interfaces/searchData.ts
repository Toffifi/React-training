import { Movie } from './movie';

export interface SearchData {
  movieList?: Movie[];
  offset?: number;
  totalAmount?: number;
}
