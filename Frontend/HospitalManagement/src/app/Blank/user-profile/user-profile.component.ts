import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();
  imagePreview: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
  const username = localStorage.getItem('loggedInUser');
  if (username) {
    this.userService.getUserByUsername(username).subscribe((data) => {
      this.user = data;
    });
  }
}


  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedImage!);
  }

uploadImage() {
  const input = document.getElementById('fileInput') as HTMLInputElement;
  if (!input || !input.files || input.files.length === 0) return;

  const file = input.files[0];
  const formData = new FormData();
  formData.append('image', file);

  this.http.post(`http://localhost:8080/api/user/upload-image/${this.user.id}`, formData)
    .subscribe({
      next: (res: any) => {
        console.log("Upload success", res);
        this.user.imageUrl = res.imageUrl;
      },
      error: (err) => {
        console.error("Upload failed:", err);
      }
    });
}

}
