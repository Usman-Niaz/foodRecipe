import { Component, inject } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { RecipeComponentComponent } from '../recipe-component/recipe-component.component';

@Component({
  selector: 'app-recipe',
  standalone: true, // <-- Add this
  imports: [RecipeComponentComponent], // <-- This is now valid
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  firebaseService = inject(FirebaseService); // inject the service

  constructor(private translate: TranslateService) {}

  filterByTitle(title: string) {
    if (title.trim()) {
      this.firebaseService.searchRecipesByTitle(title.trim());
    } else {
      this.firebaseService.getRecipes(); // reset if input is cleared
    }
  }
}
