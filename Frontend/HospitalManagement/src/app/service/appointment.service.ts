import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appointment } from "../model/appointment";
import { Observable } from "rxjs";
import { Patient } from "../model/patient";
import { Doctor } from "../model/doctor";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/appointment/appointment';

  constructor(private http: HttpClient) {}

    getPatients(): Observable<Patient[]> {
      return this.http.get<Patient[]>("http://localhost:8080/api/patient");
    }
  
    getDoctors(): Observable<Doctor[]> {
      return this.http.get<Doctor[]>("http://localhost:8080/api/doctor");
    }


  getAppointments() {
    return this.http.get<Appointment[]>(this.baseUrl);
  }
  getApprovedAppointments() {
    return this.http.get<Appointment[]>(this.baseUrl+"/approve");
  }
  getById(id: number) {
    return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
  }

  add(appointment: Appointment) {
    return this.http.post<Appointment>(this.baseUrl, appointment);
  }

  update(appointment: Appointment) {
    return this.http.put<void>(`${this.baseUrl}/${appointment.id}`, appointment);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
