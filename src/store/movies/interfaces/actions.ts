import { SearchData } from '@/interfaces';

import { LoadError } from './loadError';

export interface LoadingDataAction {
  type: string;
}
export interface SetDataAction {
  type: string;
  data: SearchData;
}
export interface SetTitleAction {
  type: string;
  searchKeyword: string;
}
export interface SetFilterAction {
  type: string;
  genre: string;
}
export interface SetSortAction {
  type: string;
  sortBy: string;
}
export interface ClearDataAction {
  type: string;
}
export interface SetErrorAction {
  type: string;
  error: LoadError;
}
export interface SetDataChangeStatusAction {
  type: string;
}

export type Action =
  | LoadingDataAction
  | SetDataAction
  | SetTitleAction
  | SetFilterAction
  | SetSortAction
  | ClearDataAction
  | SetErrorAction
  | SetDataChangeStatusAction;
