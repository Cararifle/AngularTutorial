import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  {
    path: 'categories',
    loadComponent: () =>
      import('../app/category/category-list/category-list').then((m) => m.CategoryListComponent),
  },
  {
    path: 'authors',
    loadComponent: () => import('../app/author/author-list/author-list').then((m) => m.AuthorList),
  },
];
