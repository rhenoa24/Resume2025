import { Component } from '@angular/core';

@Component({
  selector: 'profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  protected isActive: boolean = false;
  protected toggleDisabled = false; // disable toggle during animation
  private readonly animationDuration = 500; // in ms, matches your 0.4s animation

  //====================================================================================================
  protected Toggle() {
    if (this.toggleDisabled) return // ignore clicks if disabled

    this.isActive = !this.isActive
    this.toggleDisabled = true

    setTimeout(() => {
      this.toggleDisabled = false
    }, this.animationDuration)
  }
}
