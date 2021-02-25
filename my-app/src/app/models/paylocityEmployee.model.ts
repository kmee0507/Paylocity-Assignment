import { PaylocityDependent } from "./paylocityDependent.model";
import { Person } from "./person.model";

export interface PaylocityEmployee extends Person {
  startsWithA: boolean,
  dependents: PaylocityDependent[]
}
