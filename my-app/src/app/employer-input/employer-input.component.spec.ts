import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { paylocityCost, paylocityDependent, paylocityEmployee } from '../offlinedata';

import { EmployerInputComponent } from './employer-input.component';

describe('EmployerInputComponent', () => {
  let component: EmployerInputComponent;
  let fixture: ComponentFixture<EmployerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
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
    expect(component.paylocityEmployee.firstName).toEqual('test');
    expect(component.paylocityEmployee.lastName).toEqual('aTest');
    expect(component.paylocityEmployee.startsWithA).toEqual(true);
  })

  it('create save', () => {
    component.save();
    expect(component).toBeTruthy();
  })

  it('create calculateCost', () => {
    component.calculateCosts();
    expect(component.paylocityCost.yearlyCost).toEqual(1400);
  })
});
