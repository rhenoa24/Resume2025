import { Directive, ElementRef, Renderer2, NgZone, OnDestroy, HostListener } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[isDraggableModal]',
  standalone: false
})
export class DraggableModalDirective implements OnDestroy {

  private pointerMoveSub?: Subscription;
  private pointerUpSub?: Subscription;
  private modalHiddenListener?: () => void;
  private maximizeClickListener?: () => void;
  private minimizeClickListener?: () => void;

  private startPointerX = 0;
  private startPointerY = 0;
  private startLeft = 0;
  private startTop = 0;
  private dragging = false;
  private modalDialogElement: HTMLElement | null = null;
  private marginRemoved = false;

  constructor(
    private host: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) { }

  // Pointer down on header or any child inside host
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    // Only left button / primary pointer
    if (event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (!target) return;

    // Find if the pointerdown originated from a draggable header inside a modal-dialog
    const header = target.closest('.modal-header') as HTMLElement | null;
    const dialog = (header && header.closest('.modal-dialog')) as HTMLElement | null;

    // if no header or dialog or it's a maximized dialog, ignore (user had .modal-dialog-max)
    if (!header || !dialog || dialog.classList.contains('modal-dialog-max')) {
      // still attach maximize/minimize behavior if present on this dialog
      if (dialog) {
        this.attachWindowButtons(dialog);
      }
      return;
    }

    // Keep reference to dialog so we can restore styles when modal hides
    this.modalDialogElement = dialog;

    // Prevent dragging from starting on native buttons inside header
    if ((target.tagName || '').toLowerCase() === 'button') {
      return;
    }

    // begin dragging
    event.preventDefault();
    this.dragging = true;

    // Make sure the dialog is positioned so left/top moves take effect
    // We set position to fixed so it stays relative to viewport (prevents jump on scroll)
    this.ngZone.runOutsideAngular(() => {
      this.ensureDialogPosition();

      // capture starting coordinates
      this.startPointerX = event.clientX;
      this.startPointerY = event.clientY;

      const rect = this.modalDialogElement!.getBoundingClientRect();
      this.startLeft = rect.left;
      this.startTop = rect.top;

      // subscribe to pointermove and pointerup on document
      this.pointerMoveSub = fromEvent<PointerEvent>(document, 'pointermove')
        .pipe(takeUntil(fromEvent(document, 'pointerup')))
        .subscribe(e => this.onPointerMove(e));

      this.pointerUpSub = fromEvent<PointerEvent>(document, 'pointerup')
        .subscribe(e => this.onPointerUp(e));

      // attach bootstrap modal hidden event to restore styles when modal is closed
      this.addModalHiddenListener();
    });
  }

  private ensureDialogPosition(): void {
    if (!this.modalDialogElement) return;

    // Remove transform/margins that Bootstrap may have applied so left/top will be accurate
    if (!this.marginRemoved) {
      this.renderer.setStyle(this.modalDialogElement, 'transform', 'none');
      this.renderer.setStyle(this.modalDialogElement, 'margin', '0');
      this.marginRemoved = true;
    }

    // set fixed positioning (so dialog stays positioned relative to viewport)
    const computed = getComputedStyle(this.modalDialogElement);
    if (computed.position !== 'fixed') {
      this.renderer.setStyle(this.modalDialogElement, 'position', 'fixed');
    }
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.dragging || !this.modalDialogElement) return;

    // Prevent text selection / default behavior while dragging
    event.preventDefault();

    const deltaX = event.clientX - this.startPointerX;
    const deltaY = event.clientY - this.startPointerY;

    let newLeft = Math.round(this.startLeft + deltaX);
    let newTop = Math.round(this.startTop + deltaY);

    // Constrain within viewport bounds (use visualViewport if available)
    const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const rect = this.modalDialogElement.getBoundingClientRect();

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft > viewportWidth - rect.width) newLeft = Math.max(0, viewportWidth - rect.width);
    if (newTop > viewportHeight - rect.height) newTop = Math.max(0, viewportHeight - rect.height);

    // apply new position
    this.renderer.setStyle(this.modalDialogElement, 'left', `${newLeft}px`);
    this.renderer.setStyle(this.modalDialogElement, 'top', `${newTop}px`);
  }

  private onPointerUp(event: PointerEvent): void {
    // Only primary pointer
    if (event.button !== 0) {
      return;
    }

    this.dragging = false;
    this.cleanupPointerSubscriptions();
  }

  private cleanupPointerSubscriptions(): void {
    if (this.pointerMoveSub) {
      this.pointerMoveSub.unsubscribe();
      this.pointerMoveSub = undefined;
    }
    if (this.pointerUpSub) {
      this.pointerUpSub.unsubscribe();
      this.pointerUpSub = undefined;
    }
  }

  // Attach handlers for maximize/minimize controls if present inside a dialog
  private attachWindowButtons(dialog: HTMLElement): void {
    // maximize
    const maxBtn = dialog.querySelector<HTMLElement>('.win-maximize');
    if (maxBtn) {
      // avoid multiple listeners
      if (!this.maximizeClickListener) {
        const maxHandler = () => {
          // Example behavior: remove inline styles and add a marker class
          this.renderer.removeStyle(dialog, 'left');
          this.renderer.removeStyle(dialog, 'top');
          this.renderer.removeStyle(dialog, 'position');
          dialog.classList.add('modal-maximized');
          this.marginRemoved = false;
        };
        maxBtn.addEventListener('click', maxHandler);
        this.maximizeClickListener = () => maxBtn.removeEventListener('click', maxHandler);
      }
    }

    // minimize / close
    const closeBtns = dialog.querySelectorAll<HTMLElement>('.win-minimize, .btn-close, .win-hide, .btn-cancel');
    if (closeBtns && closeBtns.length) {
      if (!this.minimizeClickListener) {
        const closeHandler = () => {
          dialog.classList.remove('modal-maximized');
        };
        closeBtns.forEach(b => b.addEventListener('click', closeHandler));
        this.minimizeClickListener = () => closeBtns.forEach(b => b.removeEventListener('click', closeHandler));
      }
    }
  }

  // When the modal gets hidden (Bootstrap event), restore original styles
  private addModalHiddenListener(): void {
    if (!this.modalDialogElement) return;
    const modalParent = this.modalDialogElement.closest('.modal');

    if (!modalParent) return;

    const handler = () => {
      // restore original inline styles we modified
      this.renderer.removeStyle(this.modalDialogElement!, 'left');
      this.renderer.removeStyle(this.modalDialogElement!, 'top');
      this.renderer.removeStyle(this.modalDialogElement!, 'position');
      this.renderer.removeStyle(this.modalDialogElement!, 'transform');
      this.renderer.removeStyle(this.modalDialogElement!, 'margin');
      this.marginRemoved = false;

      // remove the event listener on the modal parent
      modalParent.removeEventListener('hidden.bs.modal', handler);
    };

    // keep a reference so we can remove it in ngOnDestroy if needed
    this.modalHiddenListener = handler;
    modalParent.addEventListener('hidden.bs.modal', handler);
  }

  ngOnDestroy(): void {
    // cleanup pointer subscriptions
    this.cleanupPointerSubscriptions();

    // remove modal hidden listener
    if (this.modalHiddenListener && this.modalDialogElement) {
      const modalParent = this.modalDialogElement.closest('.modal');
      if (modalParent) {
        modalParent.removeEventListener('hidden.bs.modal', this.modalHiddenListener);
      }
      this.modalHiddenListener = undefined;
    }

    // remove maximize / minimize listeners
    if (this.maximizeClickListener) {
      this.maximizeClickListener();
      this.maximizeClickListener = undefined;
    }
    if (this.minimizeClickListener) {
      this.minimizeClickListener();
      this.minimizeClickListener = undefined;
    }

    // restore any inline styles left on the dialog
    if (this.modalDialogElement) {
      this.renderer.removeStyle(this.modalDialogElement, 'left');
      this.renderer.removeStyle(this.modalDialogElement, 'top');
      this.renderer.removeStyle(this.modalDialogElement, 'position');
      this.renderer.removeStyle(this.modalDialogElement, 'transform');
      this.renderer.removeStyle(this.modalDialogElement, 'margin');
    }
  }
}
