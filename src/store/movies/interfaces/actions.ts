import { LoadingType } from '@/enums/loadingType';
import { SearchData } from '@/interfaces';

export interface SetDataAction {
  type: string;
  data: SearchData;
}
export interface SetLoadingAction {
  type: string;
  isLoading: LoadingType;
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
  error: string;
}

export type Action =
  | SetDataAction
  | SetLoadingAction
  | SetTitleAction
  | SetFilterAction
  | SetSortAction
  | ClearDataAction
  | SetErrorAction;
