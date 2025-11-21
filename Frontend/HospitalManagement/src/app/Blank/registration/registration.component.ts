// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/user.model';
// import { UserService } from 'src/app/service/user.service';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent implements OnInit {
//        //user: User = new User();
//     user = { userCode : '', name : '', username: '', email: '', password: '', confirmPassword : '', userRole: ''  };
//     message = '';

//   constructor(private userService: UserService, private router: Router) { }
//   ngOnInit(): void {
   
//   }

//   register() {
//     this.userService.register(this.user).subscribe(() => {

//        Swal.fire({
//               title: "successful",
//               icon: "success",
//               draggable: true
//             });
          
//       this.message = 'Registration successful';
//       this.router.navigate(['/login']);
//     }, (error: any) => {

      
//        Swal.fire({
//               title: "failed",
//               icon: "success",
//               draggable: true
//             });
            
//       console.error('Registration error: ', error);
//       this.message = 'Registration failed';
//     });
//   }

// }

  






// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/user.model';
// import { UserService } from 'src/app/service/user.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent implements OnInit {

//   user: User = new User(); // Type-safe
//   message = '';

//   roles: string[] = ['AdminPanel', 'Doctor', 'Patient', 'Staff', 'LabPanel'];

//   constructor(private userService: UserService, private router: Router) { }

//   ngOnInit(): void { }

//   register() {
//     // Convert userCode to number (model expects number)
//     if (this.user.userCode) {
//       this.user.userCode = +this.user.userCode;
//     }

//     // Password confirm check
//     if (this.user.password !== this.user.confirmPassword) {
//       Swal.fire({
//         title: "Passwords do not match",
//         icon: "error",
//         draggable: true
//       });
//       return;
//     }

//     // Call backend
//     this.userService.register(this.user).subscribe({
//       next: (res: any) => {
//         // Save token in localStorage
//         if (res.token) {
//           localStorage.setItem('jwtToken', res.token);
//         }

//         Swal.fire({
//           title: "Registration Successful",
//           icon: "success",
//           draggable: true
//         });

//         // Optionally store user info
//         localStorage.setItem('loggedInUser', res.user.username);
//         localStorage.setItem('userRole', res.user.role);
//         localStorage.setItem('userId', res.user.id);

//         this.router.navigate(['/login']);
//       },
//       error: (err: any) => {
//         Swal.fire({
//           title: "Registration Failed",
//           text: err?.error || 'Server Error',
//           icon: "error",
//           draggable: true
//         });
//         console.error('Registration error:', err);
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  message: string = '';
  user = {
    userCode: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userRole: 'Patient'  // default
  };

  roles: string[] = ['AdminPanel', 'Doctor', 'Patient', 'Staff', 'LabPanel'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // register() {
  //   if (this.user.password !== this.user.confirmPassword) {
  //     Swal.fire('Error', 'Passwords do not match', 'error');
  //     return;
  //   }

  //   this.userService.register(this.user as any).subscribe({
  //     next: (res: any) => {
  //       // Store JWT token + user info
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('loggedInUser', res.user.username);
  //       localStorage.setItem('userRole', res.user.role);
  //       localStorage.setItem('userId', res.user.id);

  //       Swal.fire('Success', 'Registration successful', 'success');
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err: any) => {
  //       console.error('Registration error:', err);
  //       Swal.fire('Error', err?.error || 'Server Error', 'error');
  //     }
  //   });
  // }


  register() {
  if (this.user.password !== this.user.confirmPassword) {
    Swal.fire('Error', 'Passwords do not match', 'error');
    return;
  }

  this.userService.register(this.user).subscribe({
    next: (res: any) => {

      localStorage.setItem('token', res.token);
      localStorage.setItem('loggedInUser', res.user.username);
      localStorage.setItem('userRole', res.user.role);
      localStorage.setItem('userId', res.user.id);

      Swal.fire('Success', 'Registration successful', 'success');
      this.router.navigate(['/login']);
    },
    error: (err: any) => {
      console.error("Registration error:", err);

      Swal.fire(
        "Error",
        err?.error?.message || "Server Error",
        "error"
      );
    }
  });
}

}
