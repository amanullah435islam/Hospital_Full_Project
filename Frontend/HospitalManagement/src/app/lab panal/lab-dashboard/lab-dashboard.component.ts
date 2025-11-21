import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment';
import { Patient } from 'src/app/model/patient';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-lab-dashboard',
  templateUrl: './lab-dashboard.component.html',
  styleUrls: ['./lab-dashboard.component.css']
})

//Labratory
export class LabDashboardComponent implements OnInit {
  searched: boolean = false;



  selectedPatientId: number | null = null;
  patient: Patient[] = [];
  ptns : Patient[] = [];
  appointment: Appointment = new Appointment();
  constructor(private appointmentService: AppointmentService, private http :HttpClient) { }

   tests: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('prescriptionData');
    if (data) {
      const prescription = JSON.parse(data);
      this.tests = prescription.tests || [];
    }

    this.getAll();
  }



  loadPatients() {
    this.appointmentService.getPatients().subscribe(data => this.patient = data);
  }

getAll() {
      this.http.get('http://localhost:8080/api/appointment/appointment/getMeta')
      .subscribe(
       (responsen : any) => Object.entries(responsen).map(([key, value])=>{
           if(key == "patient"){
                 (value as Patient[]).forEach((patient: Patient) => {
                  this.ptns.push(patient);
                });
              }
        })

      );
    }



searchPatient() {
  this.searched = true;
   console.log("Selected Patient ID:", this.selectedPatientId);

  const data = localStorage.getItem('prescriptionData');
  if (data) {
    const prescription = JSON.parse(data);

    if (prescription.patient.id == this.selectedPatientId) {
      this.tests = prescription.tests || [];
      console.log("Matched Lab Tests:", this.tests);
    } else {
      this.tests = [];
      console.warn("No prescription found for selected patient.");
      alert("This patient's prescription was not found!");
    }
  }
}



onReport(test: any, index: number) {
    console.log('Report button clicked for:', test, 'at index', index);
 
  }

  onTest(test: any, index: number) {
    console.log('Test button clicked for:', test, 'at index', index);

  }

}
