import { PaylocityCost } from "./models/paylocityCost.model";
import { PaylocityDependent } from "./models/paylocityDependent.model";
import { PaylocityEmployee } from "./models/paylocityEmployee.model";

export const paylocityDependent: PaylocityDependent[] = [
  {
    firstName: 'bob',
    lastName: 'jones',
    startsWithA: false
  }
]

export const paylocityEmployee: PaylocityEmployee[] = [
  {
    startsWithA: true,
    dependents: [paylocityDependent[0]],
    firstName: 'test',
    lastName: 'aTest'
  }
];

export const paylocityCost: PaylocityCost[] = [
  {
    employees: [paylocityEmployee[0]],
    yearlyCost: 0,
    payCheckCost: 0
  }
]
