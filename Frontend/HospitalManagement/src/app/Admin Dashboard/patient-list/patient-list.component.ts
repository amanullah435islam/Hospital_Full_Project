import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  url = 'http://localhost:8080/api/Patient';
  patients: Patient[] = [];
  patient: Patient = new Patient();
  updatePatient: Patient = new Patient();
  divStatus = false;
  
tests: any[] = [];
 constructor(private http: HttpClient, private patientService: PatientService) { }
  ngOnInit(): void {
    this.getAll();



       const data = localStorage.getItem('prescriptionData');
    if (data) {
      const prescription = JSON.parse(data);
      this.tests = prescription.tests || [];
    }
  }


    getAll() {
      this.patientService.getPatients().subscribe(
      (response) => this.patients = response
    );
  }

  Add(patient: Patient) {
    this.patientService.add(patient).toPromise().then(() => {
      this.getAll();
      this.patient = new Patient();
    });


  }

  edit(patient: Patient) {
    this.updatePatient = Object.assign({}, patient);
    this.divStatus = true;
  }

  update(patient: Patient) {
         Swal.fire
         ("✅ update Successful",
           "",
            "success");
    this.patientService.update(patient).toPromise().then(() => {
      this.getAll();
      this.updatePatient = new Patient();
      this.divStatus = false;
    });
  }

  delete(id: number) {
         Swal.fire
         (" delete Successful",
           "",
            "success");
    if (confirm("Are you sure you want to delete this Patient?")) {
      this.patientService.delete(id).toPromise().then(() => this.getAll());
    }
  }


}
