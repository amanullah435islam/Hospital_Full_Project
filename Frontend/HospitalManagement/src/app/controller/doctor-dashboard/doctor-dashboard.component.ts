import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentService } from 'src/app/service/appointment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})

export class DoctorDashboardComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private route :  Router) {}

  appointments : Appointment[] = [];
  //appointments = new Appointment();
    
  ngOnInit(): void {
    this.loadAppointments();
    console.log(this.appointments)
  }
  
  loadAppointments() {
    this.appointmentService.getApprovedAppointments().subscribe(res =>    
      res.forEach(element => {
            this.appointments.push(element);  
      }))
    }

    
id: string = "";
prescribe(app: Appointment) {
  console.log(app);
   Swal.fire({
              title: "Open Prescribe this page",
              icon: "success",
              draggable: true
            });

  this.id = app.patientId;
  localStorage.removeItem("patientID");
  localStorage.setItem("patientID", this.id);

  localStorage.removeItem("doctorID");
  localStorage.setItem("doctorID", app.doctorId);

  if (app.id) {
    localStorage.setItem("appointmentID", String(app.id));
    this.route.navigate(['/prescription']);
  } else {
    alert("Invalid appointment");
  }
}

}
