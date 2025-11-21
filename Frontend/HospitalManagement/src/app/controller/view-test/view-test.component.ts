import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit {
 //reportData: any;
  todayDate = new Date().toISOString().slice(0, 10);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const data = localStorage.getItem('labTestReport');
    if (data) {
      this.reportData = JSON.parse(data);
    }
 
  }


  reportData = {
    patientName: 'Amanullah',
    patientId: 'PT-001',
    age: 30,
    testName: 'Blood Test',
    testType: 'Biochemistry',
    description: 'Liver Function Test',
    normalRange: '5-40 U/L',
    unit: 'U/L'
  };

  //todayDate = new Date().toLocaleDateString();

  generateTestPDF() {
    const element = document.getElementById('labReportContent');
    if (!element) return;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 10;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('lab-test-report.pdf');
    });
    

     Swal.fire({
                    title: "PDF Successful",
                    icon: "success",
                    draggable: true
                  });
  }
}