import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fruitNames = ['Apple', 'Orange', 'Pineapple', 'Avocado'];
  valueFruitName: string;
  isEnabled = false;

  constructor() {
    for (let index = 0; index < 4; index++) {
      console.log(this.fruitNames[index]);
    }

    this.fruitNames.forEach((name) => console.log(name));

    this.fruitNames.forEach(this.loopFruitName);

    for (const fruitName of this.fruitNames) {
      console.log(fruitName);
    }
  }

  loopFruitName(element) {
    console.log(element);
  }

  addNewFruitName() {
    if (
      this.valueFruitName === undefined ||
      this.valueFruitName.trim() === ''
    ) {
      return false;
    }
    // const newFruitName = 'Fruit ' + (this.fruitNames.length + 1);
    this.fruitNames.push(this.valueFruitName);

    console.log(this.fruitNames);
  }

  captureFruitName(evt) {
    this.valueFruitName = evt.target.value;
    this.isEnabled = this.valueFruitName.trim() === '' ? false : true;
    // console.log(evt.target.value);
  }

  removeFruitName(index: number) {
    this.fruitNames.splice(index, 1);
    console.log('remove fruit name: ' + index);
  }
}
