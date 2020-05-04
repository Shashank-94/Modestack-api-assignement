import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private apiUrl = "http://localhost:8000/users/";
  constructor(private http: HttpClient) { }

  register(data): Observable<any>{
    return this.http.post<any>(this.apiUrl+'register', data);
  }

  login(data): Observable<any>{
    return this.http.post<any>(this.apiUrl+'login', data);
  }
}
