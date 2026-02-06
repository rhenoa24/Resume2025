import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../app-services/theme.service';

interface ThemeItem {
  type: 'theme';
  key: string;
  label: string;
}

interface DividerItem {
  type: 'divider';
}

type ThemeOption = ThemeItem | DividerItem;


@Component({
  selector: 'nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent implements OnInit {
  protected currentScroll: string = 'home'

  protected scrollTo(id: string) {
    this.currentScroll = id

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  //====================================
  private themeService = inject(ThemeService);

  themes: ThemeOption[] = [
    { type: 'theme', key: 'dark', label: 'Dark Theme' },
    { type: 'theme', key: 'light', label: 'Light Theme' },

    //{ type: 'divider' },

    //{ type: 'theme', key: 'ren', label: "Ren's Theme" },
    //{ type: 'theme', key: 'tobio', label: "Tobio's Theme" },
    //{ type: 'theme', key: 'shoyo', label: "Shoyo's Theme" },
    //{ type: 'theme', key: 'kenma', label: "Kenma's Theme" }
  ];


  selectedTheme: string = 'dark';

  ngOnInit(): void {
    this.selectedTheme = this.themeService.getTheme();
    this.applyTheme(this.selectedTheme);
  }

  onThemeSelect(themeKey: string): void {
    this.selectedTheme = themeKey;
    this.themeService.setTheme(themeKey);
    this.applyTheme(themeKey);
  }

  private applyTheme(themeKey: string): void {
    document.body.className = document.body.className
      .split(' ')
      .filter(c => !c.endsWith('-theme'))
      .join(' ');

    document.body.classList.add(`${themeKey}-theme`);
  }

}
