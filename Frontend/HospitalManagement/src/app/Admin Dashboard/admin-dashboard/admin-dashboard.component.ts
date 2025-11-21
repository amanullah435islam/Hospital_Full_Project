import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

 
  // public barChartOptions: ChartOptions = {
  //   responsive: true
  // };

  // public barChartLabels: string[] = [];
  // public barChartData: { data: number[], label: string }[] = [
  //   { data: [], label: 'Payments Per Day' }
  // ];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend: boolean = true;

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.loadChartData();
  // }

  // loadChartData(): void {
  //   this.http.get<any[]>('http://localhost:8080/api/appPayment/all').subscribe(data => {
  //     const dateMap: { [key: string]: number } = {};

  //     data.forEach(item => {
  //       const date = new Date(item.paymentDate).toISOString().split('T')[0];
  //       dateMap[date] = (dateMap[date] || 0) + 1;
  //     });

  //     this.barChartLabels = Object.keys(dateMap);
  //     this.barChartData[0].data = Object.values(dateMap);
  //   });
  // }



 
  public barChartOptions: ChartOptions = {
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartData: { data: number[], label: string }[] = [
    { data: [], label: 'Lab Payments Count Per Day' }
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLabPaymentChart();
  }

  loadLabPaymentChart(): void {
    this.http.get<any[]>('http://localhost:8080/api/TestPayment/all').subscribe(data => {
      const dateMap: { [key: string]: number } = {};

      data.forEach(item => {
        const date = new Date(item.paidAt).toISOString().split('T')[0];
        dateMap[date] = (dateMap[date] || 0) + 1; 
      });

      this.barChartLabels = Object.keys(dateMap);
      this.barChartData[0].data = Object.values(dateMap);
    });
  }
}

