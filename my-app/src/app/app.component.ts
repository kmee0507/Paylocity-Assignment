import { Component, Input, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { DataService } from './data.service';
import { PaylocityCost } from './models/paylocityCost.model';
import { PaylocityEmployee } from './models/paylocityEmployee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Paylocity Assignment';
  paylocityCost: PaylocityCost;
  paylocityEmployees: PaylocityEmployee[];
  subs = new SubSink();
  constructor(protected dataService: DataService){}

  ngOnInit(): void {
    console.log("app starting");
    // this.loadEmployees(); would call with api backend
  }

  loadEmployees() {
    this.paylocityEmployees = null as any;
    this.dataService.getEmployees().toPromise().then(data => {
      if(data !== undefined && data !== null)
      {
        this.paylocityEmployees = data;
      }
    })

  }

  submitButtonClicked() {
    var cost = this.dataService.getCost();
    console.log(cost);
  }

}
