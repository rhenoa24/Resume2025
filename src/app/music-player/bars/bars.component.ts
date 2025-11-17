import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bars',
  standalone: false,
  templateUrl: './bars.component.html',
  styleUrl: './bars.component.css'
})
export class BarsComponent {
  @Input() isPlaying: boolean = false
}
