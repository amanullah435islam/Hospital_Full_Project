import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Doctor } from "../model/doctor";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'http://localhost:8080/api/doctor';

  constructor(private http: HttpClient) {}

  
  getDoctorss(){
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  add(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.baseUrl +"/save", doctor, httpOptions);
  }


  update(id: number, doctor: Doctor): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${doctor.id}`, doctor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
