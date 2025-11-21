import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/Transcation.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/api/transaction';

  constructor(private http: HttpClient) {}

  getTransactionss() {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }

  add(transaction: Transaction) {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  update(transaction: Transaction) {
    return this.http.put<void>(`${this.baseUrl}/${transaction.id}`, transaction);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
