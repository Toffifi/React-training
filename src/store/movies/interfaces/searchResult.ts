export interface SearchResult {
  totalAmount: number;
  data: Data[];
  offset: number;
  limit: number;
}

interface Data {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
}
