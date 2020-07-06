import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  save(propertyName: string, value: string): void {
    sessionStorage.setItem(propertyName, value);
  }

  retrieve(propertyName): any {
    return sessionStorage.getItem(propertyName);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
