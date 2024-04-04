import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InternalRouterService {
  #previousRoute = signal('');
  #currentRoute = signal('');
  public getPreviousRoute = computed(() => this.#previousRoute());

  constructor() {}

  public setCurrentRoute(route: string) {
    this.#previousRoute.set(this.#currentRoute());
    this.#currentRoute.set(route);
  }
}
