import { PaylocityEmployee } from "./paylocityEmployee.model";

export interface PaylocityCost {
  employees: PaylocityEmployee[],
  yearlyCost: number,
  payCheckCost: number[]
}
