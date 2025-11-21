import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})

export class ViewPrescriptionComponent implements OnInit {
data: any = null;

  ngOnInit(): void {
    const localData = localStorage.getItem('prescriptionData');
    if (localData) {
      this.data = JSON.parse(localData);
      console.log('LocalStorage Data:', this.data);
    } else {
      console.log('No data found in localStorage!');
    }
  }

  generatePDF() {
    const content = document.getElementById('prescription-content');
    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('prescription.pdf');
      });
    }
     Swal.fire({
                title: "PDF Successful",
                icon: "success",
                draggable: true
              });
  }

}