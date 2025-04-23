// src/app/firebase.service.ts

import { Injectable, signal } from '@angular/core';
import { environment } from '../environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query ,orderBy ,startAt,endAt,doc,getDoc} from 'firebase/firestore'; 
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app;
  private db;
  recipeAdded = signal<boolean>(false); // Signal to track recipe added status
  errorOccurred = signal<string | null>(null); // Signal for error messages
  recipes = signal<Recipe[]>([]);  // New signal to store fetched recipes
  loading = signal<boolean>(false); // Optional: show loading indicator
  selectedCategory = signal<string | null>(null);


  
  constructor() {
     // Initialize Firebase with the environment configuration
     this.app = initializeApp(environment.firebaseConfig);
     
     // Initialize Firestore
     this.db = getFirestore(this.app);
  }
  async addRecipe(recipe: Recipe) {
    try {
      // Adding the recipe to Firestore
      const docRef = await addDoc(collection(this.db, 'recipes'), {
        
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        ingredients: recipe.ingredients,
        image: recipe.image
      });
  
      // Get the document id directly from docRef.id
      const recipeId = docRef.id;
  
      // Update the recipe object with the id (optional: if you want to store this locally)
      recipe.id = recipeId;
  
      console.log(`Recipe added with ID: ${recipeId}`);
  
      this.recipeAdded.set(true);  // Recipe has been successfully added
      this.errorOccurred.set(null);  // No error
    } catch (e) {
      console.error("Error adding recipe: ", e);
  
      // Update the signal to indicate an error
      this.recipeAdded.set(false);
      this.errorOccurred.set('Failed to add recipe to Firestore.');
    }
  }
  
  public async getRecipes() {
    this.loading.set(true);
    this.errorOccurred.set(null);
  
    try {
      const snapshot = await getDocs(collection(this.db, 'recipes'));
  
      const fetchedRecipes: Recipe[] = [];
  
      snapshot.forEach(doc => {
        const data = doc.data();
        fetchedRecipes.push({
          id: doc.id,
          title: data['title'],
          description: data['description'],
          category: data['category'],
          ingredients: data['ingredients'],
          image: data['image'],
          recpe: data['ingredients'],
        });
      });
  
      this.recipes.set(fetchedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      this.errorOccurred.set('Failed to fetch recipes.');
    } finally {
      this.loading.set(false);
    }
  }
  
async searchRecipesByTitle(title: string) {
  this.loading.set(true);
  this.errorOccurred.set(null);

  try {
    const recipesRef = collection(this.db, 'recipes');

    // Firebase doesn't support `contains`, so we do a prefix search
    const q = query(
      recipesRef,
      orderBy('title'),
      startAt(title),
      endAt(title + '\uf8ff') // Ensures prefix match
    );

    const snapshot = await getDocs(q);
    const filteredRecipes: Recipe[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      filteredRecipes.push({
        title: data['title'],
        description: data['description'],
        category: data['category'],
        ingredients: data['ingredients'],
        image: data['image'],
        recpe: data['ingredients'],
      });
    });

    this.recipes.set(filteredRecipes);
  } catch (error) {
    console.error('Error filtering recipes by title:', error);
    this.errorOccurred.set('Failed to filter recipes by title.');
  } finally {
    this.loading.set(false);
  }
}
async getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const docRef = doc(this.db, 'recipes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data['title'],
        description: data['description'],
        category: data['category'],
        ingredients: data['ingredients'],
        image: data['image'],
        recpe: data['ingredients'],
      };
    } else {
      return null; // Recipe not found
    }
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw new Error('Failed to fetch recipe');
  }
}
}
