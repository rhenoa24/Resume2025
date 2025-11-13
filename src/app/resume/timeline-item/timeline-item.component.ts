import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline-item',
  standalone: false,
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.css'
})
export class TimelineItemComponent {
  @Input() itemTitle: string = ""
  @Input() itemRole: string = ""
  @Input() itemYear: string = ""
  @Input() itemDesc: string = ""
  @Input() itemImg: string = ""
}
