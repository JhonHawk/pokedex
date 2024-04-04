import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [JsonPipe, ToolbarComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  public pokemon = toSignal(
    this.route.params.pipe(
      switchMap(({ name }) => this.pokemonService.getPokemonById(name)),
    ),
  );
}
