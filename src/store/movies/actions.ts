import { LoadingType } from './../../enums/loadingType';
import { ClearDataAction } from './interfaces/actions';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SearchData } from '@/interfaces';
import { mapSearchData } from '@/utils/mapSearchData';

import { RootState } from '../';
import {
  CLEAR_MOVIES_DATA,
  SET_MOVIES_DATA,
  SET_MOVIES_FILTER,
  SET_MOVIES_LOADING,
  SET_MOVIES_SORT,
  SET_SEARCH_KEYWORD,
} from './types';
import {
  SetDataAction,
  SetLoadingAction,
  SetTitleAction,
  SetSortAction,
  SetFilterAction,
} from './interfaces';

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
    const response = await fetch(
      `${url}/movies?sortBy=${params.sortBy}&sortOrder=asc&search=${params.searchKeyword}&searchBy=title&filter=${params.genre}&offset=${offset}&limit=12`
    );
    const result = await response.json();

    if (shouldClearData) {
      dispatch(clearData());
    }

    dispatch(setData(mapSearchData(result)));
    dispatch(setIsLoading(LoadingType.none));
  };
};
