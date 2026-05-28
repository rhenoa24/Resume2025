import { Component } from '@angular/core';

@Component({
  selector: 'app-artist',
  standalone: false,
  templateUrl: './artist.component.html',
  styleUrls: ['../timeline-item.component.css', '../timeline-modal.component.css']
})
export class ArtistComponent {

  experience = {
    start: '2020-04-24',
    end: '2023-04-11'
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
