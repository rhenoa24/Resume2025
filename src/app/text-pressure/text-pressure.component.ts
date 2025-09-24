import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-text-pressure',
  templateUrl: './text-pressure.component.html',
  standalone: false,
  styleUrls: ['./text-pressure.component.css']
})
export class TextPressureComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('title') titleRef!: ElementRef<HTMLHeadingElement>;
  @ViewChild('spans', { read: ElementRef }) spansRef!: ElementRef[];

  text = 'Hello!';
  chars = this.text.split('');
  fontSize = 24;
  scaleY = 1;
  lineHeight = 1;

  private mouse = { x: 0, y: 0 };
  private cursor = { x: 0, y: 0 };
  private rafId?: number;

  ngAfterViewInit() {
    this.setSize();
    this.animate();
    window.addEventListener('resize', this.setSize);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId!);
    window.removeEventListener('resize', this.setSize);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (e: MouseEvent) => {
    this.cursor.x = e.clientX;
    this.cursor.y = e.clientY;
  };

  setSize = () => {
    const container = this.containerRef.nativeElement.getBoundingClientRect();
    let newFontSize = container.width / (this.chars.length / 2);
    this.fontSize = Math.max(newFontSize, 24);
    this.scaleY = 1;
    this.lineHeight = 1;
  };

  animate = () => {
    this.mouse.x += (this.cursor.x - this.mouse.x) / 15;
    this.mouse.y += (this.cursor.y - this.mouse.y) / 15;

    const titleRect = this.titleRef.nativeElement.getBoundingClientRect();
    const maxDist = titleRect.width / 2;

    Array.from(this.titleRef.nativeElement.querySelectorAll('span')).forEach(
      (span: Element) => {
        const rect = span.getBoundingClientRect();
        const charCenter = {
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2
        };
        const d = Math.sqrt(
          Math.pow(this.mouse.x - charCenter.x, 2) +
          Math.pow(this.mouse.y - charCenter.y, 2)
        );

        const wght = Math.floor(Math.max(100, 900 - (900 * d) / maxDist));
        (span as HTMLElement).style.fontVariationSettings = `'wght' ${wght}`;
      }
    );

    this.rafId = requestAnimationFrame(this.animate);
  };
}
