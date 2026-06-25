import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meict',
  standalone: false,
  templateUrl: './meict.component.html',
  styleUrls: ['../timeline-item.component.css', '../timeline-modal.component.css']
})
export class MEICTComponent {

  experience = {
    start: '2024-09-23',
    end: '2026-07-17'
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
