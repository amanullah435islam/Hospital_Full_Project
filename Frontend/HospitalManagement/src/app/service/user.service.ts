// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { User } from '../model/user.model';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private baseUrl = 'http://localhost:8080/api/auth';

//   constructor(private http: HttpClient) {}

//   login(user: User): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, user);
//   }

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, user);
//   }

//   logout(): Observable<any> {
//     return this.http.post(`${this.baseUrl}/logout`, {});
//   }

//   getUserByUsername(username: string): Observable<User> {
//     return this.http.get<User>(`${this.baseUrl}/username/${username}`);
//   }

//   uploadImage(id: number, image: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('image', image);
//     return this.http.post(`${this.baseUrl}/upload-image/${id}`, formData);
//   }

//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.baseUrl);
//   }


//   getUserById(id: number) {
//   return this.http.get<User>(`${this.baseUrl}/register/${id}`);
// }

// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  // register(user: User): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register`, user);
  // }
register(payload: any) {
  return this.http.post(`${this.baseUrl}/register`, payload);
}
  // Optional: get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }




  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/username/${username}`);
  }
}
