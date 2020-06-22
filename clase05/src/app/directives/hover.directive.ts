import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input() appHover = 'transparent';
  @Input() colorHover = 'pink';

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseover') mouseOver() {
    this.elementRef.nativeElement.style.backgroundColor = this.colorHover;
  }

  @HostListener('mouseout') mouseOut() {
    this.elementRef.nativeElement.style.backgroundColor = this.appHover;
  }
}
