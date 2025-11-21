// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/user.model';
// import { UserService } from 'src/app/service/user.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit{
//  user: User = new User();
//    //user = { username: '', password: '', role: ''};
//   message = '';


//   constructor(private router: Router, private userService : UserService) { }
//   ngOnInit(): void {

//   }

// roles: string[] = ['AdminPanel', 'Doctor', 'Patient', 'Staff', 'LabPanel'];

//   login() {
//   this.userService.login(this.user).subscribe({
//     next: (res: any) => {
//       const role = res.role;
//       const username = res.username;
      
//          if(this.user.password == res.password){           
//             Swal.fire({
//               title: "logged in",
//               icon: "success",
//               draggable: true
//             });
//          }

//       // Store in localStorage if needed
//       localStorage.setItem('loggedInUser', res.username);
//     localStorage.setItem('userRole', res.role);
//     localStorage.setItem('userId', res.id); // For image upload
//     this.router.navigate(['/profile']);

//       // Navigate by role
//       switch (role) {
//         case 'AdminPanel':
//           this.router.navigate(['/admin']);
//           break;

//         case 'Doctor':
//           this.router.navigate(['/doctorDas']);
//           break;

//         case 'Patient':
//           this.router.navigate(['/patientDas']);
//           break;

//         case 'LabPanel':
//           this.router.navigate(['/labDas']);
//           break;

//         case 'Staff':
//           this.router.navigate(['/staff-dashboard']);
//           break;

//         default:
//           this.router.navigate(['/unauthorized']);
//           break;
//       }
//     },
//     error: (err) => {
//         Swal.fire({
//           title: "login faild",
//           icon: "success",
//           draggable: true
//         });

//       console.error(err);
//     }
//   });
// }


// }



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/user.model';
// import { UserService } from 'src/app/service/user.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   user: User = new User();
//   roles: string[] = ['AdminPanel', 'Doctor', 'Patient', 'Staff', 'LabPanel'];

//   constructor(private router: Router, private userService: UserService) { }

//   ngOnInit(): void { }

//   // login() {
//   //   this.userService.login(this.user).subscribe({
//   //     next: (res: any) => {
//   //       // Backend sends: { token, user: {id, username, role, ...} }
//   //       const token = res.token;
//   //       const user = res.user;

//   //       // Store token & user info in localStorage
//   //       localStorage.setItem('token', token);
//   //       localStorage.setItem('loggedInUser', user.username);
//   //       localStorage.setItem('userRole', user.role);
//   //       localStorage.setItem('userId', user.id);

//   //       Swal.fire({
//   //         title: 'Logged in successfully!',
//   //         icon: 'success',
//   //         draggable: true
//   //       });

//   //       // Navigate based on role
//   //       switch (user.role) {
//   //         case 'AdminPanel':
//   //           this.router.navigate(['/admin']);
//   //           break;
//   //         case 'Doctor':
//   //           this.router.navigate(['/doctorDas']);
//   //           break;
//   //         case 'Patient':
//   //           this.router.navigate(['/patientDas']);
//   //           break;
//   //         case 'LabPanel':
//   //           this.router.navigate(['/labDas']);
//   //           break;
//   //         case 'Staff':
//   //           this.router.navigate(['/staff-dashboard']);
//   //           break;
//   //         default:
//   //           this.router.navigate(['/unauthorized']);
//   //           break;
//   //       }
//   //     },
//   //     error: (err) => {
//   //       Swal.fire({
//   //         title: 'Login failed!',
//   //         text: err.error,
//   //         icon: 'error',
//   //         draggable: true
//   //       });
//   //       console.error(err);
//   //     }
//   //   });
//   // }

// login() {
//   this.userService.login(this.user).subscribe({
//     next: (res: any) => {
//       const token = res.token;
//       const user = res.user;

//       localStorage.setItem('token', token);
//       localStorage.setItem('loggedInUser', user.username);
//       localStorage.setItem('userRole', user.role);
//       localStorage.setItem('userId', user.id);

//       Swal.fire('Logged in successfully!', '', 'success');

//       switch (user.role) {
//         case 'AdminPanel': this.router.navigate(['/admin']); break;
//         case 'Doctor': this.router.navigate(['/doctorDas']); break;
//         case 'Patient': this.router.navigate(['/patientDas']); break;
//         case 'LabPanel': this.router.navigate(['/labDas']); break;
//         case 'Staff': this.router.navigate(['/staff-dashboard']); break;
//         default: this.router.navigate(['/unauthorized']); break;
//       }
//     },
//     // error: (err) => {
//     //   Swal.fire('Login failed!', err.error, 'error');
//     // }

//     error: (err) => {
//   console.log("Registration error:", err);

//   const message = typeof err.error === 'string'
//     ? err.error
//     : JSON.stringify(err.error); // convert object → string

//   Swal.fire('Error', message, 'error');
// }

//   });
// }




//   logout() {
//     this.userService.logout();
//     this.router.navigate(['/login']);
//   }
// }




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = {
    username: '',
    password: '',
    userRole: ''  // optional, যেহেতু backend শুধু username/password validate করে
  };

  roles: string[] = ['AdminPanel', 'Doctor', 'Patient', 'Staff', 'LabPanel'];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void { }

  login() {
    if (!this.loginForm.username || !this.loginForm.password) {
      Swal.fire('Error', 'Username & Password required', 'error');
      return;
    }

    this.userService.login(this.loginForm).subscribe({
      next: (res: any) => {
        // JWT token
        localStorage.setItem('token', res.token);

        // user info যদি backend থেকে আসে
        if (res.user) {
          localStorage.setItem('loggedInUser', res.user.username);
          localStorage.setItem('userRole', res.user.role);
          localStorage.setItem('userId', res.user.id);
        } else {
          localStorage.setItem('loggedInUser', this.loginForm.username);
        }

        Swal.fire('Success', 'Login successful', 'success');

        // role অনুযায়ী route
        const role = res.user?.role || this.loginForm.userRole;
        switch (role) {
          case 'AdminPanel': this.router.navigate(['/admin']); break;
          case 'Doctor': this.router.navigate(['/doctorDas']); break;
          case 'Patient': this.router.navigate(['/patientDas']); break;
          case 'LabPanel': this.router.navigate(['/labDas']); break;
          case 'Staff': this.router.navigate(['/staff-dashboard']); break;
          default: this.router.navigate(['/dashboard']); break;
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        const message = typeof err.error === 'string'
          ? err.error
          : JSON.stringify(err.error);
        Swal.fire('Error', message, 'error');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
