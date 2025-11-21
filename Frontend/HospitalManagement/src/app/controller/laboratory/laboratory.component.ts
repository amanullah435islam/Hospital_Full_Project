





import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Patient } from 'src/app/model/patient';
import { AppointmentService } from 'src/app/service/appointment.service';
import { TestPaymentService } from 'src/app/service/test-payment.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})

export class LaboratoryComponent implements OnInit {
  searched: boolean = false;



  selectedPatientId: number | null = null;
  patient: Patient[] = [];
  ptns : Patient[] = [];
  appointment: Appointment = new Appointment();
  constructor(private appointmentService: AppointmentService, private http :HttpClient, private route :Router,
    private testPaymentService: TestPaymentService) { }

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



onTest(test: any, index: number) {
  Swal.fire({
    icon: 'success',
    title: 'Test Completed!',
    text: `The test "${test.testName}" has been successfully done.`,
    confirmButtonText: 'OK'
  });
}


onReport(test: any, index: number) {
  this.testPaymentService.checkTestPayment(test.testCode).subscribe(
    (isPaid: boolean) => {
      if (!isPaid) {
        Swal.fire({
          title: "Payment Required",
          text: "Please pay before viewing the report.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Pay Now"
        }).then((result) => {
          if (result.isConfirmed) {
            // Save to localStorage
            localStorage.setItem('pendingTestCode', test.testCode);
            localStorage.setItem('pendingPatientId', test.patientId);

            // Navigate to payment page
            this.route.navigate(['/testPayment']);
          }
        });
      } else {
        Swal.fire("Report View", "Report loaded successfully!", "info");
        // Show report popup or open modal
      }
    }
  );
}


}
