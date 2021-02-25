import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCost(): Observable<number> {
    const uri = "http://localhost:8000/api/costs";
    console.log(uri);
    return this.http.get<number>(uri );
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application.json'
    })
  }

}
