import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-rotating-text',
  standalone: false,
  templateUrl: './rotating-text.component.html',
  styleUrl: './rotating-text.component.css'
})
export class RotatingTextComponent {

  @Input() texts: string[] = [];
  @Input() period: number = 2000;

  private loopNum = 0;
  private txt = '';
  private isDeleting = false;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    if (this.texts.length) {
      this.tick();
    }
  }

  private tick() {
    const i = this.loopNum % this.texts.length;
    const fullTxt = this.texts[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    const span = this.elRef.nativeElement.querySelector('.wrap');
    if (span) {
      span.innerHTML = this.txt;
    }

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }

}

