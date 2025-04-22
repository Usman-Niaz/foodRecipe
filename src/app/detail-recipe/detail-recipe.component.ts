import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-detail-recipe',
  imports: [],
  templateUrl: './detail-recipe.component.html',
  styleUrl: './detail-recipe.component.css',
})
export class DetailRecipeComponent implements OnInit {
  firebaseService = inject(FirebaseService);
  recipe: Recipe | null = null; // To store the recipe details
  loading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
    if (id) {
      this.fetchRecipeDetails(id);
    }
  }

  async fetchRecipeDetails(id: string): Promise<void> {
    try {
      const recipe = await this.firebaseService.getRecipeById(id);
      if (recipe) {
        this.recipe = recipe;
      } else {
        this.error = 'Recipe not found.';
      }
    } catch (error) {
      this.error = 'Error fetching recipe details.';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
