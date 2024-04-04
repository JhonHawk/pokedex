export interface PokemonListPagination {
  count: number;
  paginatorState: PageEvent;
  results: Result[];
  loading: boolean;
}

export interface Result {
  name: string;
  url: string;
  index: number;
}

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
}

export type PokemonList = Result[];
