import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/pokemon/pokemon.routes').then(m => m.routes),
  }
];
