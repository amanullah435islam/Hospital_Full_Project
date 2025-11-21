
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Patient } from "../model/patient";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPatients() {
    return this.http.get<Patient[]>(this.baseUrl + "/patient");
  }

  getById(id: number) {
    return this.http.get<Patient>(`${this.baseUrl + "/patient"}/${id}`);
  }

  add(patient: Patient) {
    return this.http.post<Patient>(this.baseUrl + "/patient", patient, httpOptions);
  }

  update(patient: Patient) {
    return this.http.put<void>(`${this.baseUrl + "/update"}/${patient.id}`, patient);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl + "/patient"}/${id}`);
  }
}
