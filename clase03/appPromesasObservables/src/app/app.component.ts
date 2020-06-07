import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'appPromesasObservables';
  postList = [];

  executeCallAPI() {
    /*     const promise = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.responseText);
          // console.log(this.responseText);
        } else if (this.readyState === 4 && this.status !== 200) {
          reject();
        }
      };

      xhttp.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
      xhttp.send();
    }); */
    /*     promise.then(
      (data: string) => {
        console.log('Response from API was successfully');
        console.log(typeof data);
        this.postList = JSON.parse(data);
        // console.log(data);
      },
      (error) => {
        console.log('An error ocurred');
      }
    ); */
    /*     promise
      .then((data: string) => {
        console.log('Response from API was successfully');
        console.log(typeof data);
        this.postList = JSON.parse(data);
        // console.log(data);
      })
      .catch((error) => {
        console.log('An error ocurred');
      }); */
    /*     promise.then((data: string) => {
      console.log('Response from API was successfully');
      console.log(typeof data);
      this.postList = JSON.parse(data);
      // console.log(data);
    });

    promise.catch((error) => {
      console.log('An error ocurred');
    }); */
  }

  executeManyCallAPI() {
    const holidaysReportStuff = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { user: 'user01', days: 6 },
          { user: 'user02', days: 5 },
        ]);
      }, 3000);
    });

    const daysWorkedReportStuff = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { user: 'user01', daysWorked: 23 },
          { user: 'user02', daysWorked: 534 },
        ]);
      }, 5000);
    });

    Promise.all([holidaysReportStuff, daysWorkedReportStuff])
      .then((information) => console.log(information))
      .catch((error) => console.log(error));
  }

  executeManyCallApiWinner() {
    const statusCompany01 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Company01 is winner');
      }, 3000);
    });

    const statusCompany02 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Company02 is winner');
      }, 5000);
    });

    Promise.race([statusCompany01, statusCompany02])
      .then((information) => console.log(information))
      .catch((error) => console.log(error));
  }
}
