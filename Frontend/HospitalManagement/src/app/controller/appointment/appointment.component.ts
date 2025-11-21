import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Doctor } from 'src/app/model/doctor';
import { Patient } from 'src/app/model/patient';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})


export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  addForm!: FormGroup;

  patient: Patient[] = [];
  doctors: Doctor[] = [];
  formLabel = 'Add Appointment';
  saveMode = true;          


  appointment: Appointment = new Appointment();
  apps: Appointment[] = [];
  ptns : Patient[] = [];
  dcrs : Doctor[] = [];
  

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private http: HttpClient,
    private route: Router
  ) {}


ngOnInit(): void {
  this.buildForm();
  this.loadAppointments();
  this.loadPatients();
  this.loadDoctors();
  this.getAll();

  const savedDoctor = localStorage.getItem('selectedDoctor');
  if (savedDoctor) {
    const doctor = JSON.parse(savedDoctor);
    this.addForm.patchValue({
      doctorId: doctor.doctorId,          
      doctorName: doctor.doctorName,     
      department: doctor.specialize       
    });

    localStorage.removeItem('selectedDoctor');
  }
}


onPatientSelection(event: any) {
  const selectedName = event.target.selectedOptions[0].text;
  this.addForm.get('patientName')?.setValue(selectedName);
}

onDoctorSelection(event: any) {
  const selectedName = event.target.selectedOptions[0].text;
  this.addForm.get('doctorName')?.setValue(selectedName);
}



  getAll() {
      this.http.get('http://localhost:8080/api/appointment/appointment/getMeta')
      .subscribe(
       (responsen : any) => Object.entries(responsen).map(([key, value])=>{
              if(key == "Appointment"){
                (value as Appointment[]).forEach((appointment: Appointment) => {
                  this.apps.push(appointment);
                });
              }else if(key == "patient"){
                 (value as Patient[]).forEach((patient: Patient) => {
                  this.ptns.push(patient);
                });
              }else if(key == "doctor"){
                 (value as Doctor[]).forEach((doctor: Doctor) => {
                  this.dcrs.push(doctor);
                });
              }
        })

      );
    }

    loadPatients() {
    this.appointmentService.getPatients().subscribe(data => this.patient = data);
  }

  loadDoctors() {
    this.appointmentService.getDoctors().subscribe(data => this.doctors = data);
  }


  private buildForm() {
  this.addForm = this.fb.group({
  id: [],
  appointmentCode: [Math.floor(1000 + Math.random() * 9000)],  // ata dile by defult code asbe app. from a.
  patientId: ['', Validators.required],
  patientName: ['', Validators.required],
  doctorId: ['', Validators.required],
  doctorName: ['', Validators.required],
  date: ['', Validators.required],        
  department: ['', Validators.required],
  status: [0, [Validators.required, Validators.maxLength(11)]],
  madicleHistry: ['', Validators.required],    
  bookingDate: ['', Validators.required],   
  paymentStatus: ['', Validators.required]  
    });
  }



  private loadAppointments() {
    this.appointmentService.getAppointments().subscribe(res => (this.appointments = res));
  }

 
 addAppointment() {
  if (this.addForm.invalid) return;
  const appointment: Appointment = this.addForm.value;

  localStorage.setItem('latestAppointment', JSON.stringify(appointment));

  this.appointmentService.add(appointment).subscribe(() => {
    this.loadAppointments();
    this.addForm.reset();
    window.location.href = '/appPayment'; 
  });
}


}
