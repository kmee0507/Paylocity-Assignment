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
    const uri = "/controllers/cost/getCost";
    console.log(uri);
    return this.http.get<number>(uri );
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
