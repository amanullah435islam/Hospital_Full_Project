import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
 
  url = 'http://localhost:8080/api/Patient';
  patients: Patient[] = [];
  patient: Patient = new Patient();
  updatePatient: Patient = new Patient();
  divStatus = false;

  

 constructor(private http: HttpClient, private patientService: PatientService, private route: Router) { }
  ngOnInit(): void {
    this.getAll();

  }


    getAll() {
      this.patientService.getPatients().subscribe(
      (response) => this.patients = response
    );
  }

  Add(patient: Patient) {
     Swal.fire
     ("✅ Add Successful",
       "",
        "success");
    this.patientService.add(patient).toPromise().then(() => {
      this.getAll();
      this.patient = new Patient();
    });  
  }

}


  // localStorage.removeItem('prescriptionData');
      // localStorage.setItem('prescriptionData', JSON.stringify(this.patients));

      // console.log('Saved in localStorage:', this.patients);

      // // Redirect to view
      // this.route.navigate(['/pList']);