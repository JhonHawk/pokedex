import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonListPagination } from '../interfaces/pokemon-list-pagination';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  URL_BASE = environment.BASE_URL_POKEMON;
  #http: HttpClient = inject(HttpClient);

  #state = signal<PokemonListPagination>({
    count: 0,
    next: '',
    previous: '',
    results: [],
    loading: false
  })

  pokemons = computed(() => this.#state().results);
  loading = computed(() => this.#state().loading);

  getListPokemon() {
    this.#state.set({ ...this.#state(), loading: true });
    this.#http.get<PokemonListPagination>(this.URL_BASE)
      .subscribe((data) => {
        this.#state.set({ ...data, loading: false })
      });
  }

  getNextListPokemon() {
    this.#state.set({ ...this.#state(), loading: true });
    this.#http.get<PokemonListPagination>(this.#state().next)
      .subscribe((data) => {
        this.#state.set({ ...data, loading: false, results: [...this.#state().results, ...data.results] })
      });
  }

  getPokemonById(name: string): Observable<Pokemon> {
    return this.#http.get<Pokemon>(`${this.URL_BASE}/${name}`);
  }
}
