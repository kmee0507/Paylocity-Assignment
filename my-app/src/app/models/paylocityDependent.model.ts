import { Person } from "./person.model";

export interface PaylocityDependent extends Person {
  startsWithA: boolean;
}
