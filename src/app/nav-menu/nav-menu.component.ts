import { Component } from '@angular/core';

@Component({
  selector: 'nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  protected currentScroll: string = 'home'

  protected scrollTo(id: string) {
    this.currentScroll = id

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

}
