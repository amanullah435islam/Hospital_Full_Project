import { Injectable } from '@angular/core';
import { TestList } from '../model/TestList.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestViewService {
  private baseUrl = 'http://localhost:8080/api/TestList';

  constructor(private http: HttpClient) {}

  getTestListss() {
    return this.http.get<TestList[]>(this.baseUrl + '/all');
  }

  getById(id: number) {TestList
    return this.http.get<TestList>(`${this.baseUrl}/${id}`);
  }

  add(testList: TestList) {
    return this.http.post<TestList>(this.baseUrl + '/save', testList);
  }

  update(testList: TestList) {
    return this.http.put<void>(`${this.baseUrl}/${testList.id}`, testList);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
