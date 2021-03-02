import { ComponentFixture, TestBed } from '@angular/core/testing';
import { paylocityCost, paylocityDependent, paylocityEmployee } from '../offlinedata';

import { EmployerInputComponent } from './employer-input.component';

describe('EmployerInputComponent', () => {
  let component: EmployerInputComponent;
  let fixture: ComponentFixture<EmployerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerInputComponent);
    component = fixture.componentInstance;
    component.paylocityEmployee = paylocityEmployee[0];
    component.paylocityDependent = paylocityDependent[0];
    component.paylocityCost = paylocityCost[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create employee', () => {
    component.createEmployee()
    expect(component.paylocityEmployee.firstName).toEqual('');
    expect(component.paylocityEmployee.lastName).toEqual('');
    expect(component.paylocityEmployee.startsWithA).toEqual(false);
  })

  it('create save', () => {
    component.save();
    expect(component).toBeTruthy();
  })

  it('create calculateCost', () => {
    component.calculateCosts();
    expect(component.paylocityCost.yearlyCost).toEqual(1300);
  })
});
