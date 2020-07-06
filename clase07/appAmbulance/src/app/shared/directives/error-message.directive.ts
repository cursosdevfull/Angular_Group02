import { Directive, OnInit, ElementRef, HostListener } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as uuid from 'uuid';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControlName],[formControl]',
})
export class ErrorMessageDirective implements OnInit {
  errorSpanId = '';

  subscriptionControl: Subscription;

  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit(): void {
    this.errorSpanId = uuid.v4();
    this.subscriptionControl = this.control.statusChanges.subscribe(
      (status) => {
        if (status === 'INVALID') {
          this.addErrorMessage();
        } else {
          this.removeErrorMessage();
        }
      }
    );
  }

  addErrorMessage(): void {
    this.removeErrorMessage();
    const valuesErrors: ValidationErrors = this.control.errors;
    const firstError = Object.keys(valuesErrors)[0];
    // firstError => required, email, pattern, ...

    let errorMessage;

    switch (firstError) {
      case 'required':
        errorMessage = 'Field is required';
        break;
      case 'email':
        errorMessage = 'Field has not format email';
        break;
      case 'pattern':
        errorMessage = 'Field has not pattern correct';
        break;
      default:
        errorMessage = 'An error ocurred';
    }

    const labelErrorSpan = `
      <span style="color:red;font-style:italic;font-size: 11px" id="${this.errorSpanId}">${errorMessage}</span>
    `;

    this.el.nativeElement.parentElement.insertAdjacentHTML(
      'beforeend',
      labelErrorSpan
    );
  }

  removeErrorMessage(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) {
      errorElement.remove();
    }
  }

  @HostListener('blur', ['$event'])
  eventBlur(event): void {
    if (this.control.value === null || this.control.value === '') {
      if (this.control.errors) {
        this.addErrorMessage();
      } else {
        this.removeErrorMessage();
      }
    }
  }
}
