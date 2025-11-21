import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./controller/main-layout/main-layout.component";
import { HomeComponent } from "./controller/home/home.component";
import { DashboardComponent } from "./Admin Dashboard/dashboard/dashboard.component";
import { BlackComponent } from "./Blank/black/black.component";
import { RegistrationComponent } from "./Blank/registration/registration.component";
import { LoginComponent } from "./Blank/login/login.component";
import { MainContentComponent } from "./controller/main-content/main-content.component";
import { PatientComponent } from "./Admin Dashboard/patient/patient.component";
import { DoctorDashboardComponent } from "./controller/doctor-dashboard/doctor-dashboard.component";
import { AdminDashboardComponent } from "./Admin Dashboard/admin-dashboard/admin-dashboard.component";
import { EmployeeComponent } from "./Admin Dashboard/employee/employee.component";
import { PatientDashboardComponent } from "./controller/patient-dashboard/patient-dashboard.component";
import { DoctorCardComponent } from "./controller/doctor-card/doctor-card.component";
import { PrescriptionComponent } from "./controller/prescription/prescription.component";
import { ViewPrescriptionComponent } from "./controller/view-prescription/view-prescription.component";
import { AppointmentComponent } from "./controller/appointment/appointment.component";
import { LabPanelComponent } from "./lab panal/lab-panel/lab-panel.component";
import { LabDashboardComponent } from "./lab panal/lab-dashboard/lab-dashboard.component";
import { AddLabTestComponent } from "./lab panal/add-lab-test/add-lab-test.component";
import { ProfitLossComponent } from "./Admin Dashboard/profit-loss/profit-loss.component";
import { WalledComponent } from "./Admin Dashboard/walled/walled.component";
import { AppointmentListComponent } from "./Admin Dashboard/appointment-list/appointment-list.component";
import { AppointmentPaymentComponent } from "./controller/appointment-payment/appointment-payment.component";
import { DoctorListComponent } from "./Admin Dashboard/doctor-list/doctor-list.component";
import { PatientListComponent } from "./Admin Dashboard/patient-list/patient-list.component";
import { EmployeeListComponent } from "./Admin Dashboard/employee-list/employee-list.component";
import { LaboratoryComponent } from "./controller/laboratory/laboratory.component";
import { ViewTestComponent } from "./controller/view-test/view-test.component";
import { TestPaymentComponent } from "./controller/test-payment/test-payment.component";
import { MedicinePaymentComponent } from "./controller/medicine-payment/medicine-payment.component";
import { DoctorComponent } from "./Admin Dashboard/doctor/doctor.component";
import { PharmasistBilingComponent } from "./controller/pharmasist-biling/pharmasist-biling.component";
import { ReportComponent } from "./Admin Dashboard/report/report.component";
import { UserProfileComponent } from "./Blank/user-profile/user-profile.component";



const appRoutes: Routes = [ 

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
        {path : "home", component : HomeComponent},     
        {path : "maincomp", component : MainContentComponent},
        {path : "doctorDas", component : DoctorDashboardComponent},
        {path : "patientDas", component : PatientDashboardComponent},
        {path : "DoctorCard", component : DoctorCardComponent},
        {path : "prescription", component : PrescriptionComponent},
        {path : "viewPress", component : ViewPrescriptionComponent},
        {path : "appointment", component : AppointmentComponent},
        {path : "appPayment", component : AppointmentPaymentComponent},
        {path : "lab", component : LaboratoryComponent},
        {path : "viewTest", component : ViewTestComponent},
        {path : "testPayment", component : TestPaymentComponent},
        {path : "medPayment", component : MedicinePaymentComponent},
        {path : "pharma/:id", component : PharmasistBilingComponent}


    ]
  },

  {
        // path: 'Dashboard',
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            {path : "admin", component : AdminDashboardComponent},
            {path : "patient", component : PatientComponent},
            {path : "doctor", component : DoctorComponent},
            {path : "employee", component : EmployeeComponent},
            {path : "profitLoss", component : ProfitLossComponent},
            {path : "wallet", component : WalledComponent},
            {path : "appList", component : AppointmentListComponent},
            {path : "doctorList", component : DoctorListComponent},
            {path : "patientList", component : PatientListComponent},
            {path : "empList", component : EmployeeListComponent},
            {path : "report", component : ReportComponent},
          
          
        ]
      },

    
  {
    path: '',
    component: BlackComponent,
    children: [
        {path : "register", component : RegistrationComponent},
        {path : "login", component : LoginComponent},
        {path : "profile", component : UserProfileComponent}
    ]
  },
  
  {
        // path: 'Dashboard',
        path: '',
        component: LabPanelComponent,
        children: [
            { path: '', redirectTo: 'labDas', pathMatch: 'full' },
            {path : "labDas", component : LabDashboardComponent},
            {path : "addLab", component : AddLabTestComponent}
          
          
          
        ]
      }

];
export default appRoutes;
