import { Component, computed, inject } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { PokemonListCardComponent } from '../../components/pokemon-list-card/pokemon-list-card.component';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    PokemonListCardComponent,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  pokemonServices = inject(PokemonService);
  search: FormControl = new FormControl('');
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginatorState = computed(() => this.pokemonServices.state().paginatorState);

  constructor() {
    const page = parseInt(this.route.snapshot.paramMap.get('page') || '0');
    this.pokemonServices.getPaginationListPokemon(page);
    this.search.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.pokemonServices.setPokemonsFilter(value);
      });
  }

  onPageChange(pageEvent: PaginatorState) {
    const newPage = pageEvent.page;
    if (pageEvent.page == undefined) {
      return;
    }
    this.pokemonServices.setPage(pageEvent.page);
    this.router.navigate(['/pokedex', newPage]).then();
  }
}
