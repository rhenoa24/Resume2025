import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hitachi',
  standalone: false,
  templateUrl: './hitachi.component.html',
  styleUrls: ['../timeline-item.component.css', '../timeline-modal.component.css']
})
export class HitachiComponent {

  experience = {
    start: '2026-07-13',
    end: ''
  };

  // ========================================================================================================================
  //Default dialog size
  protected isModalMaximized: boolean = false;

  protected MaxModal_Toggle(): void {
    this.isModalMaximized = !this.isModalMaximized;
  }

  protected Reset(): void {
    this.isModalMaximized = false;
  }
}
