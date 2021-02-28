import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { PaylocityEmployee } from './models/paylocityEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCost(): Observable<number> {
    const uri = "/controllers/cost/getCost"; //with backend get the cost of employees saved and perhaps save those employees into the database for future reference
    console.log(uri);
    return this.http.get<number>(uri);
  }

  getEmployees(): Observable<PaylocityEmployee[]> {
    const uri = "/controllers/employees/getEmployees"; //with backend retrieve all employees from database on page load
    return this.http.get<PaylocityEmployee[]>(uri);
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application.json'
    })
  }

}
