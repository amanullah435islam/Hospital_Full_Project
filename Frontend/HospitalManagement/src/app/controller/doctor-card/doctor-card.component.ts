import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})

export class DoctorCardComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  searchTerm: string = '';
  selectedDepartment: string = '';

  specialize = [
    'Pathology',
    'Neurology',
    'Cardiology',
    'Orthopedics',
    'Pediatrics',
    'Dermatologist',
    'Ophthalmologist'
  ];

  constructor(private readonly doctorService: DoctorService, private route : Router) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

bookDoctor(doctor: Doctor) {
  localStorage.setItem('selectedDoctor', JSON.stringify({
    doctorId: doctor.id,               // ✅ doctorId পাঠান
    doctorName: doctor.doctorName,    // ✅ নাম
    specialize: doctor.specialize     // ✅ department
  }));
  this.route.navigate(['/appointment']);
}

  loadDoctors(): void {
    this.doctorService.getDoctorss().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.filteredDoctors = [...doctors];
      },
      error: (err) => console.error('Error loading doctors:', err)
    });
  }


  

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = doctor.doctorName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           doctor.specialize?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDepartment = this.selectedDepartment === '' || 
                               this.selectedDepartment === 'All Departments' ||
                               doctor.specialize === this.selectedDepartment;
      
      return matchesSearch && matchesDepartment;
    });
  }

  onSearchChange(): void {
    this.filterDoctors();
  }

  onDepartmentChange(): void {
    this.filterDoctors();
  }
  
}






 


