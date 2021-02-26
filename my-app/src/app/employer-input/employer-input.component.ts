import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaylocityCost } from '../models/paylocityCost.model';
import { PaylocityDependent } from '../models/paylocityDependent.model';
import { PaylocityEmployee } from '../models/paylocityEmployee.model';

@Component({
  selector: 'app-employer-input',
  templateUrl: './employer-input.component.html',
  styleUrls: ['./employer-input.component.css']
})
export class EmployerInputComponent implements OnInit {

  YEARLYCOST: number = 1000.00;
  PAYCHECKAMOUNT: number = 2000.00;
  NUMBEROFPAYCHECKS: number = 26;
  DEPENDENTCOST: number = 500.00;
  DISCOUNT: number = 0.1;

  paylocityCost: PaylocityCost;
  @Output() submitButtonClicked = new EventEmitter();
  paylocityEmployee: PaylocityEmployee
  arrayOfPaylocityEmployees: PaylocityEmployee[] = [];
  paylocityDependent: PaylocityDependent;
  employeeAdded: boolean = false;
  myForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      employeeFirstName: ['', [Validators.required]],
      employeeLastName: ['', [Validators.required]],
      dependents: this._fb.array([
        this.initDepedents()
      ])
    })
  }

  initDepedents() {
    return this._fb.group({
      dependentFirstName: '',
      dependentLastName: ''
    })
  }

  addDependent() {
    const control = <FormArray>this.myForm.controls['dependents'];
    control.push(this.initDepedents());
  }

  removeDependent(i: number) {
    const control = <FormArray>this.myForm.controls['dependents'];
    control.removeAt(i);
  }

  getControls() {
    return (this.myForm.get('dependents') as FormArray).controls;
  }

  getControlsLength() {
    return (this.myForm.get('dependents') as FormArray).controls.length;
  }

  save() {
    this.paylocityEmployee = this.createEmployee();
    this.paylocityEmployee.firstName = this.myForm.controls.employeeFirstName.value;
    this.paylocityEmployee.lastName = this.myForm.controls.employeeLastName.value;
    this.paylocityEmployee.startsWithA = this.checkIfStartsWithA(this.paylocityEmployee.firstName, this.paylocityEmployee.lastName);
    for(var i = 0; i < this.myForm.controls.dependents.value.length;i++)
    {
      this.paylocityDependent = this.createDependent();
      this.paylocityDependent.firstName = this.myForm.controls.dependents.value[i].dependentFirstName;
      this.paylocityDependent.lastName = this.myForm.controls.dependents.value[i].dependentLastName;
      this.paylocityDependent.startsWithA = this.checkIfStartsWithA(this.paylocityDependent.firstName, this.paylocityDependent.lastName);
      this.paylocityEmployee.dependents.push(this.paylocityDependent);
    }
    this.arrayOfPaylocityEmployees.push(this.paylocityEmployee);
    this.clearFields();
    console.log(this.arrayOfPaylocityEmployees);

  }

  clearFields() {
    if(this.myForm.controls.dependents.value.length > 1 ){
      this.removeDependent(this.myForm.controls.dependents.value.length - 1);
    }
    this.myForm.reset();
  }

  createEmployee(): PaylocityEmployee {
    return {
      firstName: '',
    lastName: '',
    startsWithA: false,
    dependents: []
    }
  }

  createDependent(): PaylocityDependent {
    return {
      firstName: '',
        lastName: '',
        startsWithA: false
    }
  }

  createCosts(): PaylocityCost {
    return{
      employees: [],
      yearlyCost: 0,
      payCheckCost: 0
    }
  }

  onSubmitClick(): void {
    this.paylocityCost = this.createCosts();
    console.log("Submit Clicked");
    console.log(this.arrayOfPaylocityEmployees);
    this.paylocityCost.employees = this.arrayOfPaylocityEmployees;
    this.calculateCosts();
    this.submitButtonClicked.emit();
  }

  calculateCosts(){
    var totalCost = 0.0;
    var currentEmployeeCost = 0.0;
    var currentDependentCost = 0.0;
    for(var i = 0; i < this.paylocityCost.employees.length; i++) {
      if(this.paylocityCost.employees[i].startsWithA)
      {
         currentEmployeeCost = this.YEARLYCOST - (this.YEARLYCOST * this.DISCOUNT);
      }
      else
      {
        currentEmployeeCost = this.YEARLYCOST;
      }
      totalCost += currentEmployeeCost;

      for(var j = 0; j < this.paylocityCost.employees[i].dependents.length; j++)
      {
        if(this.paylocityCost.employees[i].dependents[j].startsWithA)
        {
          currentDependentCost = this.DEPENDENTCOST - (this.DEPENDENTCOST * this.DISCOUNT);
        }
        else
        {
          currentDependentCost = this.DEPENDENTCOST;
        }
        totalCost += currentDependentCost;
      }
    }
    this.paylocityCost.yearlyCost = totalCost;
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