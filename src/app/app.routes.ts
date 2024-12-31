import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component'),
  },
  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons/pokemons.component'),
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon.component'),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
