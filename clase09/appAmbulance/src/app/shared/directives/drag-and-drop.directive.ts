import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onHover = new EventEmitter<boolean>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSendingFile = new EventEmitter<FileList>();

  constructor() {}

  @HostListener('dragover', ['$event']) onDragOver($event): void {
    $event.preventDefault();
    this.onHover.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event): void {
    $event.preventDefault();
    this.onHover.emit(false);
  }

  @HostListener('drop', ['$event']) onDrop($event): void {
    $event.preventDefault();
    this.onHover.emit(false);
    this.onSendingFile.emit($event.dataTransfer.files);
  }
}
