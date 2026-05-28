import { Component } from '@angular/core';

@Component({
  selector: 'app-datadefenders',
  standalone: false,
  templateUrl: './datadefenders.component.html',
  styleUrls: ['../timeline-item.component.css', '../timeline-modal.component.css']
})
export class DatadefendersComponent {

  experience = {
    start: '2023-01-16',
    end: '2024-09-20'
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
