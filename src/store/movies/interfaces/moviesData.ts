import { SearchData, SearchParams } from '@/interfaces';

export interface MoviesData {
  isLoading: boolean;
  data?: SearchData;
  params: SearchParams;
  error?: string;
}
