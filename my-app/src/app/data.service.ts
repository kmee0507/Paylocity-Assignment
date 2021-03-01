import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { PaylocityEmployee } from './models/paylocityEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  /**
   *  Returns cost of employees and dependents submitted
   *
   * @returns Cost
   */
  getCost(): Observable<number> {
    const uri = "/controllers/cost/getCost"; //with backend get the cost of employees saved and perhaps save those employees into the database for future reference
    return this.http.get<number>(uri);
  }

  /**
   *  Returns an array of employees that can be used for quick searching in the UI
   *
   * @returns PaylocityEmployee[]
   */
  getEmployees(): Observable<PaylocityEmployee[]> {
    const uri = "/controllers/employees/getEmployees"; //with backend retrieve all employees from database on page load
    return this.http.get<PaylocityEmployee[]>(uri);
  }

  // additional param for get that would specify necessary headers required to access api on backend server
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application.json'
    })
  }

}
