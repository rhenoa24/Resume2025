import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[Spotlight]',
  standalone: false
})
export class SpotlightDirective implements OnInit {
  @Input() spotlightDisabled: boolean = false; // Input to enable/disable the effect

  private Xpos: number = 0;
  private Ypos: number = 0;
  private XposCenter: number = 0;
  private isFollowingMouse: boolean = false;
  private instanceID: string

  private floatingDivContainer: HTMLDivElement
  private floatingDiv: HTMLDivElement

  private updating: boolean = false

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.instanceID = `float-${Math.random().toString(36).substring(2, 9)}`

    // Create container div
    this.floatingDivContainer = this.renderer.createElement('div')
    this.renderer.addClass(this.floatingDivContainer, 'r-floating-div-container')

    // Create floating div
    this.floatingDiv = this.renderer.createElement('div')
    this.renderer.addClass(this.floatingDiv, 'r-floating-div')
    this.renderer.setAttribute(this.floatingDiv, 'id', this.instanceID)

    // Append floatingDiv inside the container
    this.renderer.appendChild(this.floatingDivContainer, this.floatingDiv)
    // Append container inside the directive's host element
    this.renderer.appendChild(this.el.nativeElement, this.floatingDivContainer)
  }

  ngOnInit(): void {
    if (this.spotlightDisabled) {
      this.renderer.addClass(this.floatingDivContainer, 'disabled')
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.spotlightDisabled) return // Stop if disabled

    if (!this.updating) {

      this.updating = true

      // Mouse Move event may fire faster than the browser refresh rate.
      // Limit the spotlight updates to browser refresh rate.
      // The function inside requestAnimationFrame is scheduled to run
      // before the next repaint of the browser.
      window.requestAnimationFrame(() => {

        if (!this.isFollowingMouse) {
          this.isFollowingMouse = true
        }

        const rect: DOMRect = this.el.nativeElement.getBoundingClientRect()

        if (this.XposCenter === 0) {
          this.XposCenter = rect.width / 2
        }

        this.Xpos = event.clientX - rect.left
        this.Ypos = event.clientY - rect.top

        this.updateFloatingDiv()

        this.updating = false
      })
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.spotlightDisabled) return // Stop if disabled

    this.isFollowingMouse = false
    this.Xpos = this.XposCenter
    this.Ypos = 0
    this.updateFloatingDiv()
  }

  private updateFloatingDiv(): void {
    this.renderer.setStyle(this.floatingDiv, 'top', `${this.Ypos}px`)
    this.renderer.setStyle(this.floatingDiv, 'left', `${this.Xpos}px`)

    if (!this.isFollowingMouse) {
      this.renderer.addClass(this.floatingDiv, 'smooth')
    } else {
      this.renderer.removeClass(this.floatingDiv, 'smooth')
    }
  }
}
