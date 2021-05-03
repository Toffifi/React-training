import { SearchData } from '@/interfaces';
import { RootState } from '../';
export const getIsLoading = (state: RootState): boolean => {
  return state.movies.searchResult.isLoading;
};
export const getMoviesData = (state: RootState): SearchData => {
  return state.movies.searchResult.data;
};
