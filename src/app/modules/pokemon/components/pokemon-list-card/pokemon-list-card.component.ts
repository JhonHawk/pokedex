import {
  AfterViewInit,
  Component,
  Input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Result } from '../../../../core/interfaces/pokemon-list-pagination';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-pokemon-list-card',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    CardModule,
    ButtonModule,
    AvatarModule,
  ],
  templateUrl: './pokemon-list-card.component.html',
  styleUrl: './pokemon-list-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PokemonListCardComponent implements AfterViewInit {
  urlImage = environment.BASE_URL_IMAGE;
  @Input({ required: true }) pokemon!: Result;

  stringIndex = signal('');

  constructor() {}

  ngAfterViewInit() {
    this.stringIndex.update(() => {
      return this.pokemon.index.toString().padStart(3, '0');
    });
  }
}
