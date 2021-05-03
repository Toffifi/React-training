import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { SearchData } from '@/interfaces';
import { mapSearchData } from '@/utils/mapSearchData';

import { RootState } from '../';
import { SET_MOVIES_DATA, SET_MOVIES_LOADING } from './types';

export interface SetAction {
  type: string;
  data: SearchData;
}
export interface SetLoading {
  type: string;
  isLoading: boolean;
}

export type Action = SetAction | SetLoading;

export const set = (data: SearchData): SetAction => {
  return { type: SET_MOVIES_DATA, data };
};
export const setIsLoading = (isLoading: boolean): SetLoading => {
  return { type: SET_MOVIES_LOADING, isLoading };
};

export const search = (
  title: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true));
    const response = await fetch(
      `http://localhost:4000/movies?search=${title}&searchBy=title`
    );
    const result = await response.json();
    dispatch(set(mapSearchData(result)));
    dispatch(setIsLoading(false));
  };
};
