import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestPayment } from '../model/TestPayment.model';

@Injectable({
  providedIn: 'root'
})
export class TestPaymentService {
private baseUrl = 'http://localhost:8080/api/TestPayment';

  constructor(private http: HttpClient) {}

  addPayment(payment: TestPayment): Observable<string> {
    return this.http.post(`${this.baseUrl}/save`, payment, { responseType: 'text' });
  }

  checkTestPayment(testCode: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check/${testCode}`);
  }


      getById(id: number) {
        return this.http.get<TestPayment>(`${this.baseUrl}/${id}`);
      }
    
       getPayments(): Observable<TestPayment[]> {
      return this.http.get<TestPayment[]>(this.baseUrl + '/all');
    }
  
    
      update(Payment: TestPayment) {
        return this.http.put<void>(`${this.baseUrl}/${Payment.id}`, Payment);
      }
    
      delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
      }
}