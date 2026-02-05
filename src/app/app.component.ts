import { Component, OnInit } from '@angular/core';
import { ThemeService } from './app-services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Resume2025';

  themes: string[] = [
    'dark',
    'light',
    'ren',
    'tobio',
    'shoyo',
    'kenma',
  ];

  selectedTheme: string = 'dark';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.selectedTheme = this.themeService.getTheme();
    this.applyTheme(this.selectedTheme);
  }

  onThemeChange(theme: string): void {
    this.selectedTheme = theme;
    this.applyTheme(theme);
  }

  private applyTheme(theme: string): void {
    this.themes.forEach(t => {
      document.body.classList.remove(`${t}-theme`);
    });

    document.body.classList.add(`${theme}-theme`);
    this.themeService.setTheme(theme);
  }

}
