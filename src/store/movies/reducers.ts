import { combineReducers } from 'redux';

import {
  SET_MOVIES_DATA,
  SET_MOVIES_LOADING,
  SET_SEARCH_KEYWORD,
} from './types';
import {
  Action,
  MoviesData,
  SetDataAction,
  SetLoadingAction,
  SetTitleAction,
} from './interfaces';

export interface State {
  searchResult: MoviesData;
}

const searchResult = (
  state: MoviesData = {
    isLoading: false,
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
      return { ...state, data: (action as SetDataAction).data };
    case SET_MOVIES_LOADING:
      return { ...state, isLoading: (action as SetLoadingAction).isLoading };
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        params: {
          ...state.params,
          searchKeyword: (action as SetTitleAction).searchKeyword,
        },
      };
    default:
      return state;
  }
};
export default combineReducers<State>({
  searchResult,
});
