import { Directive, ElementRef, HostListener } from '@angular/core';

import $ from 'jquery'

@Directive({
  selector: '[isDraggableModal]',
  standalone: false
})
export class DraggableModalDirective {

  constructor(private el: ElementRef<HTMLElement>) {

  }

  private cursorStartX: number = 0;
  private cursorStartY: number = 0;
  private originalX: number = 0;
  private originalY: number = 0;
  private isMouseDown: boolean = false;
  private marginRemoved: boolean = false;
  private modalHiddenListener!: EventListenerOrEventListenerObject;
  private maximizedElement: HTMLElement | null = null;

  //========================================================================================================================
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {

    if (event.button !== 0) return;

    event.stopPropagation();

    let element: HTMLElement = event.target as HTMLElement;
    let isDraggableElement = this.isDraggableElement(element);
    let modalDialogElement: HTMLElement | null = this.isInsideModalDialog(element);

    if (isDraggableElement && modalDialogElement) {
      this.el = new ElementRef(modalDialogElement);

      if (this.el.nativeElement.parentElement) {
        this.modalHiddenListener = () => {
          if (this.el.nativeElement.parentElement) {
            this.el.nativeElement.parentElement.removeEventListener('hidden.bs.modal', this.modalHiddenListener);
          }
          $(modalDialogElement).removeAttr('style');
          $(this.el.nativeElement).removeAttr('style');
          this.marginRemoved = false;
        };

        this.el.nativeElement.parentElement.addEventListener('hidden.bs.modal', this.modalHiddenListener);
      }

      event.preventDefault();
      this.cursorStartX = event.clientX;
      this.cursorStartY = event.clientY;

      let draggableElemRect: DOMRect = this.el.nativeElement.getBoundingClientRect();
      this.originalX = draggableElemRect.left;
      this.originalY = draggableElemRect.top;
      this.isMouseDown = true;

      document.addEventListener('mousemove', (e) => this.onMouseMove(e as MouseEvent));
      document.addEventListener('mouseup', (e) => this.documentMouseUp(e as MouseEvent));

    } else {
      // Ensure modalDialogElement exists before using it
      if (modalDialogElement) {
        $(modalDialogElement).find('.win-maximize').off("click").on("click", () => {
          this.maximizedElement = modalDialogElement;
          $(this.maximizedElement).removeAttr('style').addClass('remove');
          this.marginRemoved = false;
        });
      }

      $('.win-minimize, .btn-close, .win-hide, .btn-cancel').on("click", () => {
        if (this.maximizedElement) {
          $(this.maximizedElement).removeClass('remove');
        }
      });
    }
  }

  // ========================================================================================================================
  documentMouseUp(event: MouseEvent): void {
    this.isMouseDown = false;
    $(document).off('mousemove'); // Remove to prevent memory leaks
    $(document).off('mouseup');
  }

  // ========================================================================================================================
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {

    this.onMouseUpCore(event);
  }

  // ========================================================================================================================
  private onMouseUpCore(event: MouseEvent) {

    if (event.button !== 0) return;

    // Unbind the document mouse move event handler
    $(document).off('mousemove');

    // Set is mouse down to false
    this.isMouseDown = false;

  }

  // ========================================================================================================================
  private onMouseMove(event: MouseEvent): void {

    event.preventDefault();

    if (this.isMouseDown === false) return;

    let element: HTMLElement = this.el.nativeElement;

    let newX: number = 0;
    let newY: number = 0;

    // Get delta position of cursor relative to starting position
    let deltaX: number = event.clientX - this.cursorStartX;
    let deltaY: number = event.clientY - this.cursorStartY;

    // Calculate new element position by the delta position (how much the cursor moved)
    let calcX: number = this.originalX + deltaX;
    let calcY: number = this.originalY + deltaY;

    newX = calcX;
    newY = calcY;

    // Add constraints to draggable element so that it does not go beyond the viewport
    if (window.visualViewport) {

      let draggableElemRect: DOMRect = element.getBoundingClientRect();

      // Prevent draggable element from going beyond the left side of the window
      if (calcX <= 0) {
        newX = 0;
      }

      // Prevent draggable element from going beyond the top side of the window
      if (calcY <= 0) {
        newY = 0;
      }

      // Prevent draggable element from going beyond the right side of the window
      if (calcX > window.visualViewport.width - draggableElemRect.width) {

        newX = window.visualViewport.width - draggableElemRect.width;
      }

      // Prevent draggable element from going beyond the bottom side of the window
      if (calcY > window.visualViewport.height - draggableElemRect.height) {

        newY = window.visualViewport.height - draggableElemRect.height;
      }
    }

    // Apply new position

    if (this.marginRemoved === false) {
      $(element).attr('style', 'transform: none !important; margin: 0');
      this.marginRemoved = true;
    }

    $(element).css('left', newX + 'px');
    $(element).css('top', newY + 'px');
  }

  // ========================================================================================================================
  private isInsideModalDialog(element: HTMLElement): HTMLElement | null { // or is a maximized modal
    // Define the selector for the modal-dialog
    const modalDialogSelector = '.modal-dialog';
    const maximizedModalSelector = '.modal-dialog-max';

    // Traverse up the DOM tree
    let currentElement: HTMLElement | null = element;

    while (currentElement) {
      // Check if the current element matches the modal-dialog selector and if the modal is not maximized
      if (currentElement.matches(modalDialogSelector) && currentElement.matches(maximizedModalSelector) === false) {
        return currentElement;
      }
      // Move to the parent element
      currentElement = currentElement.parentElement;
    }

    // Return false if the modal-dialog was not found
    return null;
  }

  // ========================================================================================================================
  private isDraggableElement(element: HTMLElement): boolean {
    // Define the selector for the modal-dialog
    const modalDialogSelector = '.modal-header';

    // Traverse up the DOM tree
    let currentElement: HTMLElement | null = element;

    if (currentElement.tagName.toLowerCase() === 'button') {
      return false;
    }

    while (currentElement) {
      // Check if the current element matches the modal-dialog selector
      if (currentElement.matches(modalDialogSelector)) {
        return true;
      }
      // Move to the parent element
      currentElement = currentElement.parentElement;
    }

    // Return false if the modal-dialog was not found
    return false;
  }

}
