import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() fruitName: string;
  @Input() indexFruitName: number;
  @Output() onDeleteFruitName = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteFruitName() {
    this.onDeleteFruitName.emit(this.indexFruitName);
  }
}
