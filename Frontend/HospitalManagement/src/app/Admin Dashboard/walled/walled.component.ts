import { Component, OnInit } from '@angular/core';
import { AppPayment } from 'src/app/model/payment.model';

@Component({
  selector: 'app-walled',
  templateUrl: './walled.component.html',
  styleUrls: ['./walled.component.css']
})
export class WalledComponent implements OnInit {

appointmentPayments: AppPayment[] = [];
  labTestPayments: any[] = [];

  ngOnInit(): void {
    const apData = localStorage.getItem('wallet');
    const labData = localStorage.getItem('labWallet');

    if (apData) this.appointmentPayments = JSON.parse(apData);
    if (labData) this.labTestPayments = JSON.parse(labData);
  }
}


