import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full', // important to match the full path
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
    {
    path: 'addRecipe',
    loadComponent: () =>
      import('./add-recipe/add-recipe.component').then((c) => c.AddRecipeComponent),
  }, 
  {
    path: 'recipe',
    loadComponent: () =>
      import('./recipe/recipe.component').then((c) => c.RecipeComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./detail-recipe/detail-recipe.component').then((c) => c.DetailRecipeComponent),
  }
  
    
];
