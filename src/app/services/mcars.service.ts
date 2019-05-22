import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class McarsService {
  private baseUrl = 'http://mcars.aremok.com/api';
  constructor(private http:HttpClient) { }

  login(params) {
    return this.http.post(`${this.baseUrl}/login`,params);
  }
  signup(params) {
    return this.http.post(`${this.baseUrl}/signup`,params);
  }

  sendPasswordResetLink(params) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`,params);
  }

  changePassword(params) {
    return this.http.post(`${this.baseUrl}/resetPassword`,params);
  }
}
