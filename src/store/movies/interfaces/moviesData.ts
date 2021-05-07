import { SearchData, SearchParams } from '@/interfaces';

import { LoadError } from './loadError';

export interface MoviesData {
  isLoading: boolean;
  isPageLoading: boolean;
  data?: SearchData;
  params: SearchParams;
  error?: LoadError;
  updateStatus: {
    isLoading: boolean;
    isSuccess?: boolean;
    error?: LoadError;
  };
  addStatus: {
    isLoading: boolean;
    isSuccess?: boolean;
    error?: LoadError;
  };
  deleteStatus: {
    isLoading: boolean;
    isSuccess?: boolean;
    error?: LoadError;
  };
}
