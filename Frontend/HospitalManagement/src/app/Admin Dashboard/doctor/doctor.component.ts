import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/service/doctor.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit {

  doctors : any[] = [];
  selectedFile: File | null = null;
  imgURL: any;

  //doctors=  new Doctor();

doctor = {
    doctorCode: '',
    doctorName: '',
    specialize: '',
    description: '',
    contact: '',
    availability: '',
    email: '',
    roomNumber: '',
    image: ''
  };

  addForm!: FormGroup;
  @Output() doctorAdded = new EventEmitter<void>();
saveMode: any;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private http: HttpClient,
    private route: Router

  ) {}

  ngOnInit(): void {
   // this.buildForm();
     this.onSubmit();
  }


  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile as Blob, this.selectedFile?.name);

    // Append product data as JSON Blob
    const doctorData = {
      doctorCode: this.doctor.doctorCode,
      doctorName: this.doctor.doctorName,
      specialize: this.doctor.specialize,
      contact: this.doctor.contact,
      availability: this.doctor.availability,
      email: this.doctor.email,
      roomNumber: this.doctor.roomNumber,
      description: this.doctor.description,
      image: this.doctor.image
    };

    formData.append('doctor', new Blob([JSON.stringify(doctorData)], { type: 'application/json' }));

    // Send POST request to backend
    this.http.post('http://localhost:8080/api/doctor/saveDoctorWithImage', formData)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Medicine successfully saved!',
            showConfirmButton: false,
            timer: 1500
          });
          this.route.navigate(['/doctorList']);
        },
        error: (err) => {
          alert('Error: ' + err.message);
        }
      });
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];

    // Preview image
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile as Blob);
    reader.onload = () => {
      this.imgURL = reader.result;
    };

    // Set filename in doctor for backend
    this.doctor.image = this.selectedFile?.name ?? '';
  }
  
}

