import { RootState } from '../';
export const getIsLoading = (state: RootState): boolean => {
  console.log(state);
  return state.movies.searchResult.isLoading;
};
