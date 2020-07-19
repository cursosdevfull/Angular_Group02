import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  save(fieldNameProperty: string, fieldPropertyValue: string): void {
    sessionStorage.setItem(fieldNameProperty, fieldPropertyValue);
  }

  getFieldUser(fieldNameProperty: string, name: string): string {
    const value = sessionStorage.getItem(fieldNameProperty);

    if (value) {
      return JSON.parse(value)[name];
    }

    return;
  }

  getExistsProperty(fielNameProperty: string): boolean {
    if (sessionStorage.getItem(fielNameProperty)) {
      return true;
    } else {
      return false;
    }
  }

  clear(): void {
    sessionStorage.clear();
  }
}
