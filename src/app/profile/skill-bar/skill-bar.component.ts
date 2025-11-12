import { Component, Input } from '@angular/core';

@Component({
  selector: 'skill-bar',
  standalone: false,
  templateUrl: './skill-bar.component.html',
  styleUrl: './skill-bar.component.css'
})
export class SkillBarComponent {
  @Input() Name: string = ""
  @Input() Number: number = 0
}
