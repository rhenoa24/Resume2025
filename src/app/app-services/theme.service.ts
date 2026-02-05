import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly defaultTheme = 'dark';

  getTheme(): string {
    const theme = localStorage.getItem(this.storageKey);
    return theme ? theme : this.defaultTheme;
  }

  setTheme(theme: string): void {
    localStorage.setItem(this.storageKey, theme);
  }

  clearTheme(): void {
    localStorage.removeItem(this.storageKey);
  }
}
