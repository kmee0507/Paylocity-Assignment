import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PaylocityEmployee } from '../models/paylocityEmployee.model';

@Component({
  selector: 'app-employer-input',
  templateUrl: './employer-input.component.html',
  styleUrls: ['./employer-input.component.css']
})
export class EmployerInputComponent implements OnInit {


  @Output() submitButtonClicked = new EventEmitter();
  paylocityEmployee: PaylocityEmployee = {firstName: '',
  lastName: '',
  startsWithA: false,
  dependents: [] };
  employeeAdded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitClick(): void {
    console.log("Submit Clicked");
    this.submitButtonClicked.emit();
  }

  onAddClick(): void {
    console.log("Add Clicked");
    this.paylocityEmployee.startsWithA = this.checkIfStartsWithA(this.paylocityEmployee.firstName, this.paylocityEmployee.lastName);
    this.employeeAdded = true;

  }

  checkIfStartsWithA(firstName: string, lastName: string): boolean {
    if(firstName.toLowerCase().startsWith("a") || lastName.toLowerCase().startsWith("a")) {
      return true;
    }
    return false;

  }

}
