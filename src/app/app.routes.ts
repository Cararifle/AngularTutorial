import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  {
    path: 'categories',
    loadComponent: () =>
      import('../app/category/category-list/category-list').then((m) => m.CategoryListComponent),
  },
  {
    path: 'authors',
    loadComponent: () => import('../app/author/author-list/author-list').then((m) => m.AuthorList),
  },
  {
    path: 'games',
    loadComponent: () => import('../app/game/game-list/game-list').then((m) => m.GameList),
  },
  {
    path: 'clients',
    loadComponent: () => import('../app/client/client-list/client-list').then((m) => m.ClientList),
  },
];
