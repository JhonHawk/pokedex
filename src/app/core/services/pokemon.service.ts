import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PokemonListPagination,
  Result,
} from '../interfaces/pokemon-list-pagination';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  URL_BASE = environment.BASE_URL_POKEMON;
  #http: HttpClient = inject(HttpClient);
  allPokemons: Result[] = [];

  state = signal<PokemonListPagination>({
    count: 0,
    paginatorState: {
      first: 0,
      rows: 20,
      page: 0,
    },
    results: [],
    loading: false,
  });
  pokemons = computed(() => this.state().results);
  loading = computed(() => this.state().loading);

  constructor() {}

  getPaginationListPokemon(page: number = 0) {
    console.log('getPaginationListPokemon', page);
    this.state.set({ ...this.state(), loading: true });
    this.#http
      .get<PokemonListPagination>(`${this.URL_BASE}?limit=1302`)
      .pipe(
        map((data): PokemonListPagination => {
          return {
            ...data,
            results: this.mapIndexPokemons(data.results),
          };
        }),
      )
      .subscribe((data) => {
        this.allPokemons = data.results;
        this.state.set({
          ...this.state(),
          count: data.count,
          loading: false,
        });

        this.setPage(page);
      });
  }

  getPokemonById(name: string): Observable<Pokemon> {
    return this.#http.get<Pokemon>(`${this.URL_BASE}/${name}`);
  }

  // PRIVATE METHODS
  private mapIndexPokemons(data: Result[]): Result[] {
    const regex = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\//;
    return data.map((pokemon, index) => {
      const matches = pokemon?.url.match(regex);

      return {
        ...pokemon,
        index: matches ? parseInt(matches[1]) : index,
      };
    });
  }

  // PUBLIC METHODS
  public setPokemonsFilter(value: string) {
    const allPokemons = this.allPokemons;

    if (!value) {
      this.state.set({ ...this.state(), results: this.allPokemons });
      return;
    }

    const filterPokemons = allPokemons.filter((pokemon) => {
      return pokemon.name.includes(value);
    });

    this.state.set({ ...this.state(), results: filterPokemons });
  }

  public setPage(page: number) {
    const rows = this.state().paginatorState.rows;
    const first = page * rows;

    const filterPokemons = this.allPokemons.slice(first, (page + 1) * rows);

    this.state.set({
      ...this.state(),
      results: filterPokemons,
      paginatorState: {
        ...this.state().paginatorState,
        page: page,
        first: first,
      },
    });
  }
}
