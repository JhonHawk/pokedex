import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  {
    path: 'pokedex/0',
    redirectTo: 'pokedex/0',
  },
  {
    path: 'pokedex/:page',
    loadComponent: () =>
      import('./pages/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent,
      ),
  },
  {
    path: 'detail/:name',
    loadComponent: () =>
      import('./pages/pokemon-detail/pokemon-detail.component').then(
        (m) => m.PokemonDetailComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'pokedex/0',
    pathMatch: 'full',
  },
];
