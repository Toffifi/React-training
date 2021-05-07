import { combineReducers } from 'redux';

import {
  Action,
  MoviesData,
  SetDataAction,
  SetErrorAction,
  SetFilterAction,
  SetSortAction,
  SetTitleAction,
} from './interfaces';
import {
  MOVIE_CLEAR_DATA,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_NEXT_PAGE_FAIL,
  MOVIE_NEXT_PAGE_REQUEST,
  MOVIE_NEXT_PAGE_SUCCESS,
  SET_MOVIES_FILTER,
  SET_MOVIES_SORT,
  SET_SEARCH_KEYWORD,
} from './types';

export interface State {
  searchResult: MoviesData;
}

const searchResult = (
  state: MoviesData = {
    isLoading: false,
    isPageLoading: false,
    params: {
      searchKeyword: '',
      genre: '',
      sortBy: '',
    },
  },
  action: Action
): MoviesData => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { ...state, isLoading: true };
    case MOVIE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...(action as SetDataAction).data,
          movieList: (action as SetDataAction).data.movieList,
        },
      };
    case MOVIE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: (action as SetErrorAction).error,
      };
    case MOVIE_NEXT_PAGE_REQUEST:
      return { ...state, isPageLoading: true };
    case MOVIE_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        isPageLoading: false,
        data: {
          ...(action as SetDataAction).data,
          movieList: [
            ...state.data.movieList,
            ...(action as SetDataAction).data.movieList,
          ],
        },
      };
    case MOVIE_NEXT_PAGE_FAIL:
      return {
        ...state,
        isPageLoading: false,
        error: (action as SetErrorAction).error,
      };
    case MOVIE_CLEAR_DATA:
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
    default:
      return state;
  }
};
export default combineReducers<State>({
  searchResult,
});
