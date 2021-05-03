import { SetFilterAction } from './interfaces/actions';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SearchData } from '@/interfaces';
import { mapSearchData } from '@/utils/mapSearchData';

import { RootState } from '../';
import {
  SET_MOVIES_DATA,
  SET_MOVIES_FILTER,
  SET_MOVIES_LOADING,
  SET_SEARCH_KEYWORD,
} from './types';
import { SetDataAction, SetLoadingAction, SetTitleAction } from './interfaces';

const url = 'http://localhost:4000';

export const setData = (data: SearchData): SetDataAction => {
  return { type: SET_MOVIES_DATA, data };
};
export const setIsLoading = (isLoading: boolean): SetLoadingAction => {
  return { type: SET_MOVIES_LOADING, isLoading };
};

export const setKeyword = (searchKeyword: string): SetTitleAction => {
  return { type: SET_SEARCH_KEYWORD, searchKeyword };
};

export const setFilter = (genre: string): SetFilterAction => {
  return { type: SET_MOVIES_FILTER, genre };
};

export const getData = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState): Promise<void> => {
    dispatch(setIsLoading(true));

    const params = getState().movies.searchResult.params;
    const response = await fetch(
      `${url}/movies?sortBy=${params.sortBy}&sortOrder=asc&search=${params.searchKeyword}&searchBy=title&filter=${params.genre}&limit=12`
    );
    const result = await response.json();
    dispatch(setData(mapSearchData(result)));
    dispatch(setIsLoading(false));
  };
};
