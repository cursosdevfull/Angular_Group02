import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formGroup]',
})
export class ErrorFormDirective {
  @Input() formGroup: FormGroup;

  constructor() {}

  @HostListener('submit', ['$event']) submit(event): void {
    this.markAsTouched(this.formGroup);
  }

  private markAsTouched(formGroup: FormGroup): void {
    setTimeout(() => {
      // tslint:disable-next-line: forin
      for (const control in formGroup.controls) {
        formGroup.controls[control].updateValueAndValidity();
      }
    }, 0);
  }
}
