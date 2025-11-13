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

  @Input() itemTagSeries: string = ""
  @Input() itemBulletSeries: string = ""

  // Converts "A || B || C" → ["A", "B", "C"]
  get tags(): string[] {
    return this.itemTagSeries
      ? this.itemTagSeries.split('||').map(tag => tag.trim()).filter(tag => tag !== '')
      : [];
  }

  get bullets(): string[] {
    return this.itemBulletSeries
      ? this.itemBulletSeries.split('||').map(b => b.trim()).filter(b => b !== '')
      : [];
  }
}
