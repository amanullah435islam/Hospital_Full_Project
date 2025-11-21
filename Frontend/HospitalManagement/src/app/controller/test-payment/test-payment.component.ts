import { Component, OnInit } from '@angular/core';
import { TestPayment } from 'src/app/model/TestPayment.model';
import { TestPaymentService } from 'src/app/service/test-payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-payment',
  templateUrl: './test-payment.component.html',
  styleUrls: ['./test-payment.component.css']
})
export class TestPaymentComponent implements OnInit {

   payment = new TestPayment();

  constructor(private testPaymentService: TestPaymentService) {}

  ngOnInit(): void {
  const testCode = localStorage.getItem('pendingTestCode');
  const patientId = localStorage.getItem('pendingPatientId');

  if (testCode && patientId) {
    this.payment.testCode = testCode;
    this.payment.patientId = Number(patientId);

    // Optional: Clear localStorage
    localStorage.removeItem('pendingTestCode');
    localStorage.removeItem('pendingPatientId');
  }
}



  makePayment() {
  if (!this.payment.patientId || !this.payment.testCode || !this.payment.amount) {
    Swal.fire("Error", "All fields are required!", "error");
    return;
  }

  this.testPaymentService.addPayment(this.payment).subscribe(
    res => {
      Swal.fire("Success", "Payment completed successfully!", "success");

      // ✅ Save to localStorage for Admin Wallet
      let labWallet = JSON.parse(localStorage.getItem('labWallet') || '[]');
      labWallet.push({ ...this.payment, paymentDate: new Date() });
      localStorage.setItem('labWallet', JSON.stringify(labWallet));

      this.payment = new TestPayment(); // clear form
    },
    err => {
      Swal.fire("Error", "Payment failed!", "error");
      console.error(err);
    }
  );
}

}
