import { Component, Input } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Paylocity Assignment';
  constructor(protected dataService: DataService){}

  submitButtonClicked() {
    var cost = this.dataService.getCost();
    console.log(cost);
  }

}
