import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicineSale } from '../model/MedicineSale.model';


// Update or create these interfaces in your types file
export interface PaymentRequest {
    paidAmount: number;
  paymentMethod: string;
  saleId?: string;
  // include other required properties
}

export interface PaymentProcessRequest extends PaymentRequest {
  // Add any additional properties required for processing
   paidAmount: number;
  paymentMethod: string;
  saleId?: string;
  // ...other properties
}


@Injectable({
  providedIn: 'root'
})

export class MedicineSaleService {

  private apiUrl = 'http://localhost:8080/api/sales'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  generateSaleFromPrescription(prescriptionId: number): Observable<MedicineSale> {
    return this.http.post<MedicineSale>(`${this.apiUrl}/from-prescription/${prescriptionId}`, {});
  }

processPayment(saleId: number, paymentRequest: PaymentProcessRequest) {
  return this.http.post<MedicineSale>(`/api/sales/${saleId}/process-payment`, paymentRequest);
}


  getSaleDetails(saleId: number): Observable<MedicineSale> {
    return this.http.get<MedicineSale>(`${this.apiUrl}/${saleId}`);
  }

  getSaleByPrescriptionId(pId: number): Observable<MedicineSale> {
  return this.http.get<MedicineSale>(`${this.apiUrl}/prescription/${pId}`);
}

}