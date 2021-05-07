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
  MOVIE_ADD_FAIL,
  MOVIE_ADD_REQUEST,
  MOVIE_ADD_SUCCESS,
  MOVIE_CLEAR_DATA,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_NEXT_PAGE_FAIL,
  MOVIE_NEXT_PAGE_REQUEST,
  MOVIE_NEXT_PAGE_SUCCESS,
  MOVIE_UPDATE_FAIL,
  MOVIE_UPDATE_REQUEST,
  MOVIE_UPDATE_SUCCESS,
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
    updateStatus: {
      isLoading: false,
    },
    addStatus: {
      isLoading: false,
    },
    deleteStatus: {
      isLoading: false,
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
    case MOVIE_UPDATE_REQUEST:
      return { ...state, updateStatus: { isLoading: true } };
    case MOVIE_UPDATE_SUCCESS:
      return {
        ...state,
        updateStatus: { isLoading: false, isSuccess: true },
      };
    case MOVIE_UPDATE_FAIL:
      return {
        ...state,
        updateStatus: {
          isLoading: false,
          isSuccess: false,
          error: (action as SetErrorAction).error,
        },
      };
    case MOVIE_ADD_REQUEST:
      return { ...state, addStatus: { isLoading: true } };
    case MOVIE_ADD_SUCCESS:
      return {
        ...state,
        addStatus: { isLoading: false, isSuccess: true },
      };
    case MOVIE_ADD_FAIL:
      return {
        ...state,
        addStatus: {
          isLoading: false,
          isSuccess: false,
          error: (action as SetErrorAction).error,
        },
      };
    case MOVIE_DELETE_REQUEST:
      return { ...state, deleteStatus: { isLoading: true } };
    case MOVIE_DELETE_SUCCESS:
      return {
        ...state,
        deleteStatus: { isLoading: false, isSuccess: true },
      };
    case MOVIE_DELETE_FAIL:
      return {
        ...state,
        deleteStatus: {
          isLoading: false,
          isSuccess: false,
          error: (action as SetErrorAction).error,
        },
      };
    default:
      return state;
  }
};
export default combineReducers<State>({
  searchResult,
});
