import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestPaymentService } from 'src/app/service/test-payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})

export class PatientDashboardComponent implements OnInit {
  prescription: any;
  myTests: any[] = [];

  constructor(private route: Router, private testPaymentService: TestPaymentService){}
  ngOnInit() {
    const data = localStorage.getItem('prescriptionData');
    if (data) {
      this.prescription = JSON.parse(data);
      console.log("Prescription data loaded in dashboard:", this.prescription);
    }



  const datax = localStorage.getItem('prescriptionData');
  if (datax) {
    const prescription = JSON.parse(datax);
    this.myTests = prescription.tests || [];
  }

  }



viewReport(test: any) {
  this.testPaymentService.checkTestPayment(test.testCode).subscribe((isPaid: boolean) => {
    if (isPaid) {
      // Paid → Proceed to report view
      const data = localStorage.getItem('prescriptionData');
      const patient = data ? JSON.parse(data).patient : null;

      const report = {
        patientName: patient?.patientName,
        patientId: patient?.id,
        age: patient?.age,
        testName: test.testName,
        testType: test.testType,
        description: test.description,
        normalRange: test.normalRange,
        unit: test.unit
      };

      localStorage.setItem("labTestReport", JSON.stringify(report));
      this.route.navigate(['/viewTest']);
    } else {
      // Not Paid → Show alert and redirect to payment
      Swal.fire({
        icon: 'warning',
        title: 'Payment Required',
        text: 'Please complete payment before viewing the report.',
        confirmButtonText: 'Go to Payment'
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate(['/test-payment']);
        }
      });
    }
  });
}



}












