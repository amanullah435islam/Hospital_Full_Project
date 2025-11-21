import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppPayment } from '../model/payment.model';
import { Observable } from 'rxjs';


 @Injectable({
  providedIn: 'root'
})
  export class PaymentService {
    private baseUrl = 'http://localhost:8080/api/appPayment';
  
    constructor(private http: HttpClient) {}
 
  
    getById(id: number) {
      return this.http.get<AppPayment>(`${this.baseUrl}/${id}`);
    }
  
     getPayments(): Observable<AppPayment[]> {
    return this.http.get<AppPayment[]>(this.baseUrl + '/all');
  }

    add(Payment: AppPayment) {
      return this.http.post<AppPayment>(this.baseUrl + '/save', Payment);
    }
  
    update(Payment: AppPayment) {
      return this.http.put<void>(`${this.baseUrl}/${Payment.id}`, Payment);
    }
  
    delete(id: number) {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}