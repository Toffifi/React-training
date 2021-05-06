import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LoadingType } from '@/enums/loadingType';
import { SearchData } from '@/interfaces';
import { mapSearchData } from '@/utils/mapSearchData';

import { RootState } from '../';
import {
  ClearDataAction,
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

const url = 'http://localhost:4000';

export const setData = (data: SearchData): SetDataAction => {
  return { type: SET_MOVIES_DATA, data };
};
export const setIsLoading = (isLoading: LoadingType): SetLoadingAction => {
  return { type: SET_MOVIES_LOADING, isLoading };
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

export const setError = (error: string): SetErrorAction => {
  return { type: SET_MOVIES_ERROR, error };
};

export const clearData = (): ClearDataAction => {
  return { type: CLEAR_MOVIES_DATA };
};

export const getData = (
  offset = 0,
  shouldClearData = true
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState): Promise<void> => {
    const loadingType = offset === 0 ? LoadingType.initial : LoadingType.page;
    dispatch(setIsLoading(loadingType));

    const params = getState().movies.searchResult.params;
    try {
      const response = await fetch(
        `${url}/movies?sortBy=${params.sortBy}&sortOrder=asc&search=${params.searchKeyword}&searchBy=title&filter=${params.genre}&offset=${offset}&limit=12`
      );
      const result = await response.json();

      if (shouldClearData) {
        dispatch(clearData());
      }

      dispatch(setData(mapSearchData(result)));
      dispatch(setIsLoading(LoadingType.none));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
