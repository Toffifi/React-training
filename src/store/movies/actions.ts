import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Movie, SearchData, SearchParams } from '@/interfaces';
import { itemOnPage } from '@/utils/constants';
import { mapSearchData } from '@/utils/mapSearchData';

import { RootState } from '../';
import {
  ClearDataAction,
  LoadingDataAction,
  SearchResult,
  SearchResultItem,
  SetDataAction,
  SetDataChangeStatusAction,
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

const url = 'http://localhost:4000/movies';

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
  return { type: MOVIE_NEXT_PAGE_REQUEST };
};
export const setNextPage = (data: SearchData): SetDataAction => {
  return { type: MOVIE_NEXT_PAGE_SUCCESS, data };
};
export const setNextPageError = (message: string): SetErrorAction => {
  return {
    type: MOVIE_NEXT_PAGE_FAIL,
    error: { type: MOVIE_LIST_FAIL, message },
  };
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
  return { type: MOVIE_CLEAR_DATA };
};

export const loadUpdate = (): LoadingDataAction => {
  return { type: MOVIE_UPDATE_REQUEST };
};
export const setUpdate = (): SetDataChangeStatusAction => {
  return { type: MOVIE_UPDATE_SUCCESS };
};
export const updateError = (message: string): SetErrorAction => {
  return {
    type: MOVIE_UPDATE_FAIL,
    error: { type: MOVIE_UPDATE_FAIL, message },
  };
};

export const loadAdd = (): LoadingDataAction => {
  return { type: MOVIE_ADD_REQUEST };
};
export const setAdd = (): SetDataChangeStatusAction => {
  return { type: MOVIE_ADD_SUCCESS };
};
export const addError = (message: string): SetErrorAction => {
  return { type: MOVIE_ADD_FAIL, error: { type: MOVIE_ADD_FAIL, message } };
};

export const loadDelete = (): LoadingDataAction => {
  return { type: MOVIE_DELETE_REQUEST };
};
export const setDelete = (): SetDataChangeStatusAction => {
  return { type: MOVIE_DELETE_SUCCESS };
};
export const deleteError = (message: string): SetErrorAction => {
  return {
    type: MOVIE_DELETE_FAIL,
    error: { type: MOVIE_DELETE_FAIL, message },
  };
};

export const getData = (
  keyword = ''
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState): Promise<void> => {
    dispatch(loadData());
    if (keyword) {
      dispatch(setKeyword(keyword));
    }
    const params = getState().movies.searchResult.params;
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
    `${url}?sortBy=${params.sortBy}&sortOrder=asc&search=${params.searchKeyword}&searchBy=title&filter=${params.genre}&offset=${offset}&limit=${itemOnPage}`
  );
  return await response.json();
};

export const getDataOnFilterChange = (
  value: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch): Promise<void> => {
    dispatch(setFilter(value));
    dispatch(getData());
  };
};

export const getDataOnSortChange = (
  value: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch): Promise<void> => {
    dispatch(setSort(value));
    dispatch(getData());
  };
};

export const updateItem = (
  data: SearchResultItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch): Promise<void> => {
    dispatch(loadUpdate());

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(setUpdate());
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => dispatch(updateError(error.message)));
  };
};

export const addItem = (
  data: SearchResultItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch): Promise<void> => {
    dispatch(loadAdd());

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(setAdd());
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => dispatch(addError(error.message)));
  };
};

export const deleteItem = (
  id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch): Promise<void> => {
    dispatch(loadDelete());
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          dispatch(setDelete());
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => dispatch(deleteError(error.message)));
  };
};
