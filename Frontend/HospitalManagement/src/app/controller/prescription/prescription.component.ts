import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Doctor } from 'src/app/model/doctor';
import { Patient } from 'src/app/model/patient';
import { Prescription } from 'src/app/model/prescription';
import { AppointmentService } from 'src/app/service/appointment.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { PatientService } from 'src/app/service/patient.service';
import { PrescriptionService } from 'src/app/service/prescription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent  implements OnInit {
  patient = new Patient();
  doctor = new Doctor();
  appointment = new Appointment();

  prs = new Prescription();
  savedPrs = new Prescription();
  prescription: any;
  

  constructor(private patientService : PatientService, private prescriptionService : PrescriptionService,
  private doctorService: DoctorService, private appointmentService: AppointmentService,
  private route : Router){}

  ngOnInit(): void {
  this.retrieveDoctor();
  this.retrievePatient();
  this.retrieveAppointment();

  const appointmentId = localStorage.getItem("appointmentID");
  console.log("Appointment ID:", appointmentId);
  }

  
  medicines: any[] = [];
  tests: any[] = [];

  addMedicine() {
    this.medicines.push({ medicineCode: '', medicineName: '', dose: '', frequency: '', duration: '' });
  }

  removeMedicine(index: number) {
    this.medicines.splice(index, 1);
  }

  addTest() {
    this.tests.push({ testCode:'', testName: '', testType: '', description: '', unit: '', normalRange: '' });
  }

  removeTest(index: number) {
    this.tests.splice(index, 1);
  }

medicineOptions = [
  'Paracetamol',
  'Amoxicillin',
  'Metformin',
  'Ibuprofen',
  'Omeprazole',
  'Atorvastatin',
  'Azithromycin'
];

// Dropdown option lists
testNames: string[] = [
  'Complete Blood Count (CBC)',
  'Blood Sugar (FBS)',
  'Urine R/E',
  'Liver Function Test',
  'Kidney Function Test',
  'ECG',
  'X-Ray',
  'Ultrasound',
  'Dengue NS1',
  'Thyroid Profile'
];

testTypes: string[] = [
  'Pathology',
  'Biochemistry',
  'Radiology',
  'Microbiology',
  'Immunology'
];

unitOptions: string[] = [
  'mg/dL', 'g/L', 'IU/L', 'mmol/L', 'cells/mcL', 
  'mEq/L', 'ng/mL', 'pg/mL'
 
];




  submitPrescription() {

     Swal.fire({
                title: "Prescribe Successful",
                icon: "success",
                draggable: true
              });
  // Patient Info
  this.prs.patientId = this.patient.id;
  this.prs.patientCode = this.patient.patientCode;
  this.prs.patientName = this.patient.patientName;
  this.prs.age = this.patient.age;
  this.prs.Date = this.patient.dob;
  this.prs.gender = this.patient.gender;
  this.prs.phone = this.patient.phone;
  this.prs.lastVisit = this.patient.lastVisit;

  // Doctor Info
  this.prs.doctorId = this.doctor.id;
  this.prs.doctorCode = this.doctor.doctorCode;
  this.prs.doctorName = this.doctor.doctorName;
  this.prs.specialize = this.doctor.specialize;
  this.prs.contact = this.doctor.contact;
  this.prs.availability = this.doctor.availability;
  this.prs.email = this.doctor.email;
  this.prs.roomNumber = this.doctor.roomNumber;

  // Appointment Info
  this.prs.appointmentId = this.appointment.id;
  this.prs.appointmentCode = this.appointment.appointmentCode;
  //this.prs.Date = this.appointment.date;
  this.prs.Date = this.appointment.date ? new Date(this.appointment.date) : undefined;
  this.prs.department = this.appointment.department;
  this.prs.status = this.appointment.status;
  this.prs.madicleHistry = this.appointment.madicleHistry;
  //this.prs.bookingDate = this.appointment.bookingDate;
  this.prs.bookingDate = this.appointment.bookingDate ? new Date(this.appointment.bookingDate) : undefined;

  this.prs.paymentStatus = this.appointment.paymentStatus;

  // Save prescription
  this.prescriptionService.add(this.prs).subscribe(
    (data: Prescription) => {
      // Save medicines
      this.medicines.forEach(element => {
        element.prescriptionId = data.id;
        element.prescriptionCode = data.prescriptionCode;
        element.appointmentId = data.appointmentId;
        element.appointmentCode = data.appointmentCode;
        this.prescriptionService.addMedicine(element).subscribe(
          res => console.log('Medicine saved:', res)
        );
      });

      // Save tests
      this.tests.forEach(element => {
        element.prescriptionId = data.id;
        element.prescriptionCode = data.prescriptionCode;
        element.appointmentId = data.appointmentId;
        element.appointmentCode = data.appointmentCode;
        this.prescriptionService.addTest(element).subscribe(
          res => console.log('Test saved:', res),
          err => console.error('Error saving test:', err)
        );
      });

      // Save to localStorage
      const fullData = {
        patient: this.patient,
        doctor: this.doctor,
        appointment: this.appointment,
        medicines: this.medicines,
        tests: this.tests
      };

                  
      localStorage.setItem('lastGeneratedPrescriptionId', data.id.toString());
      localStorage.setItem('lastGeneratedPrescriptionDetails', JSON.stringify(data));  
      localStorage.setItem('prescriptionData', JSON.stringify(fullData));

      console.log('Saved in localStorage:', fullData);
      console.log('Prescription, medicines, and tests saved. Redirecting...');

      this.route.navigate(['/viewPress']).then(() => {
        setTimeout(() => {
          this.route.navigate(['/pharma', data.id]);
        }, 10000); 
      });



    },
    
      error => {
        console.error('Error saving main prescription:', error);
        Swal.fire({
          title: "Prescribe Failed",
          text: error.message || "Something went wrong!",
          icon: "error",
          draggable: true
        });
      }
  );
}

  currentIndex = 1;
  retrieveDoctor(): void {
      this.doctorService.getById(Number(localStorage.getItem("doctorID")))
      .subscribe(
        data => {
          this.doctor = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
}


  retrievePatient(): void {
     this.patientService.getById(Number(localStorage.getItem("patientID")))
      .subscribe(
        data => {
          this.patient = data;
        },
        error => {
          console.log(error);
        });
    }



  retrieveAppointment(): void {
   this.appointmentService.getById(Number(localStorage.getItem("appointmentID")))
      .subscribe(
        data => {
          this.appointment = data;
        },
        error => {
          console.log(error);
        });
  }



}

