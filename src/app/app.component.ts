import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ThemeService } from './app-services/theme.service';

interface ThemeOption {
  key: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Resume2025';

  private themeService = inject(ThemeService);


  ngOnInit(): void {
    const theme = this.themeService.getTheme();
    document.body.classList.add(`${theme}-theme`);
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 500);
  }
}
