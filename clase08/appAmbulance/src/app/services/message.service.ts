import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  notification(message: string): void {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
