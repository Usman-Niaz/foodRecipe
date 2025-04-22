import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutComponent,
    CarouselModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  firebaseService = inject(FirebaseService);

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.firebaseService.getRecipes();
  }
  viewDetails(id: string) {
    this.router.navigate(['/detail', id]);
    console.log(id)
  }
}
