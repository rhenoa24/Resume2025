import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hexagon',
  standalone: false,
  templateUrl: './hexagon.component.html',
  styleUrl: './hexagon.component.css'
})
export class HexagonComponent {
  @Input() itemImg: string = ""
  @Input() rotate: boolean = false
  @Input() hovered = false
  @Input() isDimmed = false
}
