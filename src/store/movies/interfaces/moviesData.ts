import { LoadingType } from '@/enums/loadingType';
import { SearchData, SearchParams } from '@/interfaces';

export interface MoviesData {
  isLoading: LoadingType;
  data?: SearchData;
  params: SearchParams;
  error?: string;
}
