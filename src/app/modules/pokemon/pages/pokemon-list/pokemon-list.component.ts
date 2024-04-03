import { Component, inject } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  urlImage = environment.BASE_URL_IMAGE;
  pokemonServices = inject(PokemonService);
  constructor() {
    this.pokemonServices.getListPokemon();
  }

}
