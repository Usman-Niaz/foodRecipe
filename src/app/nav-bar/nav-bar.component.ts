import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { TranslationService } from '../translation.service';
import { RouterLink,  } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule, FontAwesomeModule,RouterLink,],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  faGlobe = faGlobe;
  dropdownOpen = false;
  isMobileMenuOpen = false;
  mobileDropdownOpen = false;
  selecrdLanguage:string='';

  constructor(private translationService: TranslationService) {}

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleMobileDropdown() {
    this.mobileDropdownOpen = !this.mobileDropdownOpen;
  }

  changeLanguage(lang: string) {
    this.translationService.translateText(lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    this.dropdownOpen = false;
    this.mobileDropdownOpen = false;
    this.isMobileMenuOpen = false;
  }
}
