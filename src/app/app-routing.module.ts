import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: '@rhenoa24 Resume 2025'
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    title: '@rhenoa24 Resume 2025 | Portfolio'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 110]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
