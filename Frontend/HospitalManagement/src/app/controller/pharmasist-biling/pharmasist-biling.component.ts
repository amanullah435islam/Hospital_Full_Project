import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MedicineSale } from 'src/app/model/MedicineSale.model';
import { Prescription } from 'src/app/model/prescription';
import { MedicineSaleService, PaymentProcessRequest } from 'src/app/service/medicine-sale.service';

import { PrescriptionService } from 'src/app/service/prescription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmasist-biling',
  templateUrl: './pharmasist-biling.component.html',
  styleUrls: ['./pharmasist-biling.component.css']
})
export class PharmasistBilingComponent implements OnInit {

 prescriptionId: number | null = null;
  currentPrescription: Prescription | null = null; 
  currentSale: MedicineSale | null = null; 

  paidAmount: number = 0;
  paymentMethod: string = 'CASH';

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  saleId: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicineSaleService: MedicineSaleService,
    private prescriptionService: PrescriptionService
  ) { }

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.prescriptionId = +id;
      this.loadPrescriptionDetailsAndGenerateBill(this.prescriptionId);
    } else {
      this.errorMessage = 'No Prescription ID provided.';
    }
  });
}

loadPrescriptionDetailsAndGenerateBill(id: number): void {
  this.isLoading = true;
  this.prescriptionService.getById(id).subscribe(
    (data: Prescription) => {
      this.currentPrescription = data;
      console.log('Loaded Prescription:', data);
      if (!data.prescriptionMedicines || data.prescriptionMedicines.length === 0) {
        this.errorMessage = 'No prescribed medicines found in this prescription.';
        this.isLoading = false;
        return;
      }
      this.checkAndGenerateBill(id);
    },
    error => {
      console.error('Error loading prescription details:', error);
      this.errorMessage = error.error?.message || 'Failed to load prescription details.';
      this.isLoading = false;
    }
  );
}


 checkAndGenerateBill(pId: number): void {
  // ✅ Check if prescription is loaded and has medicines
  if (!this.currentPrescription || !this.currentPrescription.prescriptionMedicines?.length) {
    console.warn('Prescription or medicines not loaded properly. Skipping bill generation.');
    this.errorMessage = 'No prescribed medicines found. Cannot generate bill.';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';
  this.successMessage = '';

  this.medicineSaleService.getSaleByPrescriptionId(pId)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          console.log('No existing sale found for this prescription. Generating new bill...');
          return this.medicineSaleService.generateSaleFromPrescription(pId);
        } else if (error.status === 409) {
          this.errorMessage = error.error?.message || 'Bill already generated for this prescription.';
          this.isLoading = false;
          Swal.fire({
            title: "Conflict",
            text: this.errorMessage,
            icon: "warning"
          });
          return throwError(() => new Error(this.errorMessage));
        }
        console.error('Error checking/generating bill:', error);
        this.errorMessage = error.error?.message || 'Failed to check/generate bill due to an unknown error.';
        this.isLoading = false;
        Swal.fire({
          title: "Error",
          text: this.errorMessage,
          icon: "error"
        });
        return throwError(() => new Error(this.errorMessage));
      })
    )
    .subscribe(
      sale => {
        this.currentSale = sale;
        this.saleId = sale.id;
        this.paidAmount = sale.paidAmount;
        this.successMessage = 'Bill details loaded/generated successfully!';
        this.isLoading = false;
      },
      () => {
        // Error already handled in catchError pipe.
      }
    );
}


  processPayment(): void {
    if (!this.currentSale || this.saleId === null) { // Check saleId explicitly
      this.errorMessage = 'No bill loaded to process payment for.';
      return;
    }
    if (this.paidAmount <= 0) {
      this.errorMessage = 'Please enter a valid amount to pay.';
      return;
    }
    if (this.currentSale.status === 'PAID') {
      this.errorMessage = 'This bill is already fully paid.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';



    const paymentRequest: PaymentProcessRequest = {
  paidAmount: this.paidAmount,
  paymentMethod: this.paymentMethod
};
    // The method call will now correctly expect PaymentProcessRequest
    this.medicineSaleService.processPayment(this.saleId, paymentRequest)
      .pipe(
        catchError(error => {
          console.error('Error processing payment:', error);
          this.errorMessage = error.error?.message || 'Failed to process payment.';
          this.isLoading = false;
          Swal.fire({
            title: "Payment Failed",
            text: this.errorMessage,
            icon: "error"
          });
          return throwError(() => new Error(this.errorMessage));
        })
      )
      .subscribe(updatedSale => {
        this.currentSale = updatedSale;
        this.successMessage = `Payment successful! Due: ${updatedSale.dueAmount.toFixed(2)}`;
        this.isLoading = false;
        if (updatedSale.dueAmount > 0) {
          this.paidAmount = 0;
        } else {
          // If fully paid, optionally disable payment section or redirect
          Swal.fire({
            title: "Payment Complete!",
            text: "The bill has been fully paid.",
            icon: "success"
          });
        }
      });
  }

  getRemainingDue(): number {
    return this.currentSale ? this.currentSale.dueAmount : 0;
  }

  printBill(): void {
    alert('Printing bill for Sale ID: ' + this.currentSale?.id);
    window.print();
  }
}