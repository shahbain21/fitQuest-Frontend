import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';  // Replace with your actual backend URL
  // private loginUrl = 'http://localhost:8080/api/auth/login';  // For login endpoint

  constructor(private http: HttpClient) {}

  // User login method
  // login(username: string, password: string): Observable<any> {
  //   const loginPayload = { username, password };
  //   return this.http.post<any>(this.loginUrl, loginPayload).pipe(
  //     tap(response => {
  //       if (response && response.token) {
  //         // Store the token in localStorage or sessionStorage
  //         localStorage.setItem('userToken', response.token);
  //       }
  //     })
  //   );
  // }

  // Fetch current user profile
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }

  // // User registration method (if applicable)
  // register(username: string, password: string): Observable<any> {
  //   const registerPayload = { username, password };
  //   return this.http.post<any>(`${this.apiUrl}/register`, registerPayload);
  // }

  // // Logout by removing the stored token
  // logout(): void {
  //   localStorage.removeItem('userToken');
  // }
}
