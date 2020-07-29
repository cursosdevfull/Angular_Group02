import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-list-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '200px',
          height: '200px',
          backgroundColor: 'yellow',
          opacity: 1,
        })
      ),

      state(
        'close',
        style({
          width: '200px',
          height: '200px',
          backgroundColor: 'red',
          opacity: 0.3,
        })
      ),

      transition('open => close', [animate('1s')]),
      transition('close => open', [animate('2s')]),
    ]),
  ],
})
export class ListHistoryComponent implements OnInit {
  isOpen = true;

  constructor() {}

  ngOnInit(): void {}
}
