import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(nameProperty: string, value: string) {
    sessionStorage.setItem(nameProperty, value);
  }

  get(nameProperty: string): string {
    return sessionStorage.getItem(nameProperty);
  }

  clear() {
    sessionStorage.clear();
  }
}
