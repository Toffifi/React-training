import { LoadingType } from '@/enums/loadingType';
import { SearchData } from '@/interfaces';

import { RootState } from '../';

export const getIsLoading = (state: RootState): LoadingType => {
  return state.movies.searchResult.isLoading;
};
export const getMoviesData = (state: RootState): SearchData => {
  return state.movies.searchResult.data;
};
export const getHasNextPage = (state: RootState): boolean => {
  return state.movies.searchResult.data
    ? state.movies.searchResult.data.totalAmount >
        state.movies.searchResult.data.offset + 12
    : false;
};
