import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SearchData, SearchParams } from '@/interfaces';
import { mapSearchData } from '@/utils/mapSearchData';

import { RootState } from '../';
import {
  ClearDataAction,
  LoadingDataAction,
  SearchResult,
  SetDataAction,
  SetErrorAction,
  SetFilterAction,
  SetSortAction,
  SetTitleAction,
} from './interfaces';
import {
  CLEAR_MOVIES_DATA,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  NEXT_PAGE_FAIL,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  SET_MOVIES_FILTER,
  SET_MOVIES_SORT,
  SET_SEARCH_KEYWORD,
} from './types';
import { itemOnPage } from '@/utils/constants';

const url = 'http://localhost:4000';

export const loadData = (): LoadingDataAction => {
  return { type: MOVIE_LIST_REQUEST };
};
export const setData = (data: SearchData): SetDataAction => {
  return { type: MOVIE_LIST_SUCCESS, data };
};
export const setDataError = (message: string): SetErrorAction => {
  return { type: MOVIE_LIST_FAIL, error: { type: MOVIE_LIST_FAIL, message } };
};

export const loadNextPage = (): LoadingDataAction => {
  return { type: NEXT_PAGE_REQUEST };
};
export const setNextPage = (data: SearchData): SetDataAction => {
  return { type: NEXT_PAGE_SUCCESS, data };
};
export const setNextPageError = (message: string): SetErrorAction => {
  return { type: NEXT_PAGE_FAIL, error: { type: MOVIE_LIST_FAIL, message } };
};

export const setKeyword = (searchKeyword: string): SetTitleAction => {
  return { type: SET_SEARCH_KEYWORD, searchKeyword };
};

export const setFilter = (genre: string): SetFilterAction => {
  return { type: SET_MOVIES_FILTER, genre };
};

export const setSort = (sortBy: string): SetSortAction => {
  return { type: SET_MOVIES_SORT, sortBy };
};

export const clearData = (): ClearDataAction => {
  return { type: CLEAR_MOVIES_DATA };
};

export const getData = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState): Promise<void> => {
    const params = getState().movies.searchResult.params;
    dispatch(loadData());

    try {
      const result = await getDataRequest(params);

      dispatch(clearData());

      dispatch(setData(mapSearchData(result)));
    } catch (error) {
      dispatch(setDataError(error.message));
    }
  };
};

export const getNextPage = (
  offset: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState): Promise<void> => {
    const params = getState().movies.searchResult.params;
    dispatch(loadNextPage());

    try {
      const result = await getDataRequest(params, offset);

      dispatch(setNextPage(mapSearchData(result)));
    } catch (error) {
      dispatch(setNextPageError(error.message));
    }
  };
};

const getDataRequest = async (
  params: SearchParams,
  offset = 0
): Promise<SearchResult> => {
  const response = await fetch(
    `${url}/movies?sortBy=${params.sortBy}&sortOrder=asc&search=${params.searchKeyword}&searchBy=title&filter=${params.genre}&offset=${offset}&limit=${itemOnPage}`
  );
  return await response.json();
};
