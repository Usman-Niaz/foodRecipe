import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service'; 

import { Router } from '@angular/router';
import {  TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-recipe-component',
  imports: [],
  templateUrl: './recipe-component.component.html',
  styleUrl: './recipe-component.component.css'
})
export class RecipeComponentComponent {
  firebaseService = inject(FirebaseService); // inject the service
  showAll = false; // for see all toggle
  constructor(
    private translate: TranslateService,
  
    private router: Router)
    {

  }

  ngOnInit() {
    this.firebaseService.getRecipes(); 
  }

  viewDetails(id: string) {
    this.router.navigate(['/detail', id]);
    console.log(id);
  }
  get visibleRecipes() {
    const all = this.firebaseService.recipes();
    return this.showAll ? all : all.slice(0, 6);
  }
}
