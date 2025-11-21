import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { DoctorService } from 'src/app/service/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})

 
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;
  isLoading = false;
  errorMessage = '';


  constructor(private doctorService: DoctorService, private route: Router) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

 loadDoctors(): void {
    this.isLoading = true;
    this.doctorService.getDoctorss().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load Doctors';
        this.isLoading = false;
      }
    });
  }

  editDoctor(id: number | undefined): void {
    if (id === undefined) {
      console.error('Doctor ID is undefined');
      return;
    }
    //this.route.navigate(['/admin/edit', id]);
  }


  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.doctorService.delete(id).subscribe({
        next: () => {
          // Remove doctor from list without reloading
          this.doctors = this.doctors.filter(p => p.id !== id);
           Swal.fire
              (" Doctor deleted successfully",
                  "success");
        },
        error: () => {
             Swal.fire
              (" Failed to delete Doctor",     
                "success");
        }
      });
    }
  }

 
}
