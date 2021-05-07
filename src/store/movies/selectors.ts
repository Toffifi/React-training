import { SearchData } from '@/interfaces';
import { itemOnPage } from '@/utils/constants';

import { RootState } from '../';

export const getLoadingState = (state: RootState): boolean => {
  return state.movies.searchResult.isLoading;
};
export const getPageLoadingState = (state: RootState): boolean => {
  return state.movies.searchResult.isPageLoading;
};
export const getMoviesData = (state: RootState): SearchData => {
  return state.movies.searchResult.data;
};
export const getHasNextPage = (state: RootState): boolean => {
  return state.movies.searchResult.data
    ? state.movies.searchResult.data.totalAmount >
        state.movies.searchResult.data.offset + itemOnPage
    : false;
};
export const getUpdateLoadingState = (state: RootState): boolean => {
  return state.movies.searchResult.updateStatus.isLoading;
};
export const getUpdateStatusState = (state: RootState): boolean => {
  return state.movies.searchResult.updateStatus.isSuccess;
};

export const getAddLoadingState = (state: RootState): boolean => {
  return state.movies.searchResult.addStatus.isLoading;
};
export const getAddStatusState = (state: RootState): boolean => {
  return state.movies.searchResult.addStatus.isSuccess;
};

export const getDeleteLoadingState = (state: RootState): boolean => {
  return state.movies.searchResult.deleteStatus.isLoading;
};
export const getDeleteStatusState = (state: RootState): boolean => {
  return state.movies.searchResult.deleteStatus.isSuccess;
};
