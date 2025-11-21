import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Patient } from 'src/app/model/patient';
import { AppPayment } from 'src/app/model/payment.model';
import { AppointmentService } from 'src/app/service/appointment.service';
import { PaymentService } from 'src/app/service/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrls: ['./appointment-payment.component.css']
})
export class AppointmentPaymentComponent implements OnInit {
  payments: AppPayment[] = [];
   addForm!: FormGroup;
   formLabel = 'Add Payment';
   saveMode = true;          // true = save, false = update
 
     patient: Patient[] = [];
     ptns : Patient[] = [];
     appointment: Appointment = new Appointment();
     
   constructor(
     private fb: FormBuilder,
     private paymentSvc: PaymentService,
     private appointmentService: AppointmentService,
     private http: HttpClient,
     private route: Router
   ) {}
 


   ngOnInit(): void {
    this.buildForm();

    const savedAppointment = localStorage.getItem('latestAppointment');
    if (savedAppointment) {
      const appointment = JSON.parse(savedAppointment);
      
      this.addForm.patchValue({
        patientId: appointment.patientId,
        paymentCode: appointment.appointmentCode 
      });
    }
    this.route.navigate(['/appPayment']);


   this.loadPayments();
   this.getAll();
}

 
private buildForm() {
  this.addForm = this.fb.group({
    id: [],
    paymentCode: [Math.floor(1000 + Math.random() * 9000)],
    patientId: [0, Validators.required],
    paymentDate: ['', Validators.required],
    amount: [0, Validators.required],
    paymentMethod: ['', Validators.required],

    // New Optional Fields
    mobileNumber: [''],
    transactionId: [''],
    cardNumber: [''],
    cardExpiry: ['']
  });
}

 
   private loadPayments() {
     this.paymentSvc.getPayments().subscribe(res => (this.payments = res));
   }
 

onDoctorSelection(event: any) {
  const selectedName = event.target.selectedOptions[0].text;
  this.addForm.get('doctorName')?.setValue(selectedName);
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



   // ---------- CRUD ----------

   addPayment() {
  if (this.addForm.invalid) return;

  const payment: AppPayment = this.addForm.value;
  console.log('Payment Data:', payment); // 👈 Debug check

  // backend save
  this.paymentSvc.add(payment).subscribe(() => {
    this.loadPayments();
    this.addForm.reset();
  });
}

//   addPayment() {
//   if (this.addForm.invalid) return;
//   console.log('Payment Submitted:', this.addForm.value);

//   Swal.fire({
//     title: "Payment Successful",
//     icon: "success",
//     draggable: true
//   });

//   const payment: AppPayment = this.addForm.value;

//   // Save payment to backend
//   this.paymentSvc.add(payment).subscribe(() => {
//     this.loadPayments();
//     this.addForm.reset();

//     // Save payment to localStorage
//     let wallet = JSON.parse(localStorage.getItem('wallet') || '[]');
//     wallet.push(payment);
//     localStorage.setItem('wallet', JSON.stringify(wallet));
//   });
// }

 
   editPayment(p: AppPayment) {
     this.saveMode = false;
     this.formLabel = 'Edit Payment';
     this.addForm.patchValue(p);
   }
 
   updatePayment() {
     if (this.addForm.invalid) return;
 

     const Payment: AppPayment = this.addForm.value;
     this.paymentSvc.update(Payment).subscribe(() => {
       this.saveMode = true;
       this.formLabel = 'Add Payment';
       this.addForm.reset();
       this.loadPayments();
     });
   }
 
   deletePayment(p: AppPayment) {
     if (!p.id) return;
      Swal.fire({
                 title: "Delete Successful",
                 icon: "success",
                 draggable: true
               });

     this.paymentSvc.delete(p.id).subscribe(() => {
       this.payments = this.payments.filter(x => x.id !== p.id);
     });
   }

   
 }
 
 