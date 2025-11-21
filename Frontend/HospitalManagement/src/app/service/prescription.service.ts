import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescription } from '../model/prescription';
import { Medicine } from '../model/Medicine.model';
import { LabTest } from '../model/LabTest.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private baseUrl = 'http://localhost:8080/api/prescription';

  private baseUrlMedicine = 'http://localhost:8080/api/medicine';
  
  private baseUrlTest = 'http://localhost:8080/api/labtest';

  constructor(private http: HttpClient) {}


  getPrescriptions() {
      return this.http.get<Prescription[]>(this.baseUrl);
    }
  getById(id: number) {
    return this.http.get<Prescription>(`${this.baseUrl}/${id}`);
  }

  add(prescription: Prescription) {
    return this.http.post<Prescription>(this.baseUrl + '/save', prescription);
  }

  update(patient: Prescription) {
    return this.http.put<void>(`${this.baseUrl}/${patient.id}`, patient);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

    addMedicine(medicine: Medicine) {
    return this.http.post<Medicine>(this.baseUrlMedicine + '/save', medicine);
  }
    addTest(test: LabTest) {
    return this.http.post<LabTest>(this.baseUrlTest + '/save', test);
  }

}
