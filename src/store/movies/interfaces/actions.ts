import { SearchData } from '@/interfaces';

export interface SetDataAction {
  type: string;
  data: SearchData;
}
export interface SetLoadingAction {
  type: string;
  isLoading: boolean;
}

export interface SetTitleAction {
  type: string;
  searchKeyword: string;
}
export interface SetFilterAction {
  type: string;
  genre: string;
}

export type Action =
  | SetDataAction
  | SetLoadingAction
  | SetTitleAction
  | SetFilterAction;
