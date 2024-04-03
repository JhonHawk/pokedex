export interface PokemonListPagination {
  count: number
  next: string
  previous: any
  results: Result[]
  loading: boolean
}
export interface Result {
  name: string
  url: string
}

export type PokemonList = Result[];
