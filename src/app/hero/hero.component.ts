import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-hero',
  imports: [CarouselModule,CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  images = [
    { url: 'banner3.jpg' },
    { url: 'banner4.jpg' },
    { url: 'banner6.jpg' },
    { url: 'banner7.jpg' },
    { url: 'banner9.jpg' },
    { url: 'banner10.jpg' },
    { url: 'banner11.jpg' },
    { url: 'banner12.jpg' },
    { url: 'banner13.jpg' },
    { url: 'banner14.jpg' },
  ];
  responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
