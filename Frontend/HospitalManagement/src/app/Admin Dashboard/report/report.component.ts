import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})


export class ReportComponent implements OnInit {

  selectedFilter = 'monthly';
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadIncomeChart();
  }

  loadIncomeChart() {
    this.http.get<any>(`http://localhost:8080/api/reports/income-summary?filter=${this.selectedFilter}`)
      .subscribe(data => {
        const values = [data.appointment, data.labtest, data.medicine];
        const labels = ['Appointment', 'Lab Test', 'Medicine'];

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart("incomeChart", {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: ['#2196f3', '#66bb6a', '#ffa726']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      });
  }
}
