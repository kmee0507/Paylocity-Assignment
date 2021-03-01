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
  submitButtonHidden: boolean = true;
  requiredFirstNameOutline = {"border-color": ""};
  requiredLastNameOutline = {"border-color": ""};

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

  // The following functions help to create a reactive form that will increase as dependents are added.  Gives ability to get form and its length and add and remove depedents
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

  // The save function will validate the info provided is legit and then save the information into the array of employees for future submission
  save() {
    var noIssues = this.validate();
    if(noIssues) {
      this.paylocityEmployee = this.createEmployee();
      this.paylocityEmployee.firstName = this.myForm.controls.employeeFirstName.value;
      this.paylocityEmployee.lastName = this.myForm.controls.employeeLastName.value;
      this.paylocityEmployee.startsWithA = this.checkIfStartsWithA(this.paylocityEmployee.firstName, this.paylocityEmployee.lastName);
      if(this.myForm.controls.dependents.value[0].dependentFirstName != "" && this.myForm.controls.dependents.value[0].dependentLastName != ""
        && this.myForm.controls.dependents.value[0].dependentFirstName != null && this.myForm.controls.dependents.value[0].dependentLastName != null)
      {
        for(let i = 0; i < this.myForm.controls.dependents.value.length;i++)
        {
          this.paylocityDependent = this.createDependent();
          this.paylocityDependent.firstName = this.myForm.controls.dependents.value[i].dependentFirstName;
          this.paylocityDependent.lastName = this.myForm.controls.dependents.value[i].dependentLastName;
          this.paylocityDependent.startsWithA = this.checkIfStartsWithA(this.paylocityDependent.firstName, this.paylocityDependent.lastName);
          this.paylocityEmployee.dependents.push(this.paylocityDependent);
        }
    }

    this.arrayOfPaylocityEmployees.push(this.paylocityEmployee);
    this.clearFields();
    this.submitButtonHidden = false;
    }


  }

  validate(): boolean {
    if(this.myForm.controls.employeeFirstName.value === null || this.myForm.controls.employeeLastName.value === null) {
      alert("Must fill in employee first and last name before saving");
      if(this.myForm.controls.employeeFirstName.value === null && this.myForm.controls.employeeLastName.value === null)
      {
        this.requiredFirstNameOutline = {"border-color": "red"};
        this.requiredLastNameOutline = {"border-color": "red"};
      }
      else if(this.myForm.controls.employeeLastName.value === null)
      {
        this.requiredLastNameOutline = {"border-color": "red"};
      }
      else
      {
        this.requiredFirstNameOutline = {"border-color": "red"};
      }
      return false;
    }

    if(this.myForm.controls.employeeFirstName.value.length < 1 || this.myForm.controls.employeeLastName.value.length < 1) {
      alert("Must fill in employee first and last name before saving");
      if(this.myForm.controls.employeeFirstName.value.length < 1 && this.myForm.controls.employeeLastName.value.length < 1)
      {
        this.requiredFirstNameOutline = {"border-color": "red"};
        this.requiredLastNameOutline = {"border-color": "red"};
      }
      else if(this.myForm.controls.employeeLastName.value < 1)
      {
        this.requiredLastNameOutline = {"border-color": "red"};
      }
      else
      {
        this.requiredFirstNameOutline = {"border-color": "red"};
      }
      return false;
    }

    return true;
  }

  clearFields() {
    if(this.myForm.controls.dependents.value.length > 1 ){
      this.removeDependent(this.myForm.controls.dependents.value.length - 1);
    }
    this.requiredFirstNameOutline = {"border-color": ""};
    this.requiredLastNameOutline = {"border-color": ""};
    this.myForm.reset();
  }


  // initialize empty objects functions
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

  // submit will set the employees and for the meantime calculate the cost on the front end side of things.
  // TODO with a functional backend one might add the ability to save the employee and dependent on submission for future reference
  onSubmitClick(): void {
    this.paylocityCost = this.createCosts();
    console.log("Submit Clicked");
    this.paylocityCost.employees = this.arrayOfPaylocityEmployees;
    this.calculateCosts();
    this.submitButtonClicked.emit();
    this.arrayOfPaylocityEmployees = [];
    this.submitButtonHidden = true;
  }

  calculateCosts(){
    var totalCost = 0.0;
    var currentEmployeeCost = 0.0;
    var currentDependentCost = 0.0;
    for(let i = 0; i < this.paylocityCost.employees.length; i++) {
      if(this.paylocityCost.employees[i].startsWithA)
      {
         currentEmployeeCost = this.YEARLYCOST - (this.YEARLYCOST * this.DISCOUNT);
      }
      else
      {
        currentEmployeeCost = this.YEARLYCOST;
      }
      totalCost += currentEmployeeCost;
      if(this.paylocityCost.employees[i].dependents.length > 0)
      {
        for(let j = 0; j < this.paylocityCost.employees[i].dependents.length; j++)
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
