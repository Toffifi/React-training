import { combineReducers } from 'redux';

import { SearchData, SearchParams } from '@/interfaces';

import { Action, SetAction, SetLoading } from './actions';
import { SET_MOVIES_DATA, SET_MOVIES_LOADING } from './types';

export interface MoviesData {
  isLoading: boolean;
  data?: SearchData;
  params?: SearchParams;
  error?: string;
}

export interface State {
  searchResult: MoviesData;
}

const searchResult = (
  state: MoviesData = { isLoading: false },
  action: Action
): MoviesData => {
  switch (action.type) {
    case SET_MOVIES_DATA:
      return { ...state, data: (action as SetAction).data };
    case SET_MOVIES_LOADING:
      return { ...state, isLoading: (action as SetLoading).isLoading };
    default:
      return state;
  }
};
export default combineReducers<State>({
  searchResult,
});
