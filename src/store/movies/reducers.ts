import { combineReducers } from 'redux';

import { LoadingType } from '@/enums/loadingType';

import {
  Action,
  MoviesData,
  SetDataAction,
  SetErrorAction,
  SetFilterAction,
  SetLoadingAction,
  SetSortAction,
  SetTitleAction,
} from './interfaces';
import {
  CLEAR_MOVIES_DATA,
  SET_MOVIES_DATA,
  SET_MOVIES_ERROR,
  SET_MOVIES_FILTER,
  SET_MOVIES_LOADING,
  SET_MOVIES_SORT,
  SET_SEARCH_KEYWORD,
} from './types';

export interface State {
  searchResult: MoviesData;
}

const searchResult = (
  state: MoviesData = {
    isLoading: LoadingType.none,
    params: {
      searchKeyword: '',
      genre: '',
      sortBy: '',
    },
  },
  action: Action
): MoviesData => {
  switch (action.type) {
    case SET_MOVIES_DATA:
      const movieList = state.data
        ? [...state.data.movieList, ...(action as SetDataAction).data.movieList]
        : (action as SetDataAction).data.movieList;
      return {
        ...state,
        data: {
          ...(action as SetDataAction).data,
          movieList,
        },
      };
    case SET_MOVIES_LOADING:
      return { ...state, isLoading: (action as SetLoadingAction).isLoading };
    case CLEAR_MOVIES_DATA:
      return { ...state, data: null };
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        params: {
          ...state.params,
          searchKeyword: (action as SetTitleAction).searchKeyword,
        },
      };
    case SET_MOVIES_FILTER:
      return {
        ...state,
        params: {
          ...state.params,
          genre: (action as SetFilterAction).genre,
        },
      };
    case SET_MOVIES_SORT:
      return {
        ...state,
        params: {
          ...state.params,
          sortBy: (action as SetSortAction).sortBy,
        },
      };
    case SET_MOVIES_ERROR:
      return { ...state, error: (action as SetErrorAction).error };
    default:
      return state;
  }
};
export default combineReducers<State>({
  searchResult,
});
