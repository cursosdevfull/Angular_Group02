import { Injectable } from '@angular/core';

export interface Menu {
  title: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu: Menu[] = [
    { title: 'DASHBOARD', path: '/dashboard' },
    { title: 'HISTORY', path: '/history' },
    { title: 'MEDIC', path: '/medic' },
    { title: 'DIAGNOSTIC', path: '/diagnostic' },
    { title: 'USER', path: '/user' },
    { title: 'ROLE', path: '/role' },
  ];

  constructor() {}

  itemsMenu(): Menu[] {
    return [...this.menu];
  }
}
