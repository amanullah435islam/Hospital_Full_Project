import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './controller/header/header.component';
import { FooterComponent } from './controller/footer/footer.component';
import { MainContentComponent } from './controller/main-content/main-content.component';
import { RouterModule } from '@angular/router';
import appRoutes from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './controller/home/home.component';
import { DoctorDashboardComponent } from './controller/doctor-dashboard/doctor-dashboard.component';
import { BlackComponent } from './Blank/black/black.component';
import { MainLayoutComponent } from './controller/main-layout/main-layout.component';
import { DashboardComponent } from './Admin Dashboard/dashboard/dashboard.component';
import { RegistrationComponent } from './Blank/registration/registration.component';
import { LoginComponent } from './Blank/login/login.component';
import { DoctorComponent } from './Admin Dashboard/doctor/doctor.component';
import { PatientComponent } from './Admin Dashboard/patient/patient.component';
import { EmployeeComponent } from './Admin Dashboard/employee/employee.component';
import { ProfitLossComponent } from './Admin Dashboard/profit-loss/profit-loss.component';
import { PatientDashboardComponent } from './controller/patient-dashboard/patient-dashboard.component';
import { DoctorCardComponent } from './controller/doctor-card/doctor-card.component';
import { PrescriptionComponent } from './controller/prescription/prescription.component';
import { ViewPrescriptionComponent } from './controller/view-prescription/view-prescription.component';
import { LabPanelComponent } from './lab panal/lab-panel/lab-panel.component';
import { LabDashboardComponent } from './lab panal/lab-dashboard/lab-dashboard.component';
import { AddLabTestComponent } from './lab panal/add-lab-test/add-lab-test.component';
import { AppointmentComponent } from './controller/appointment/appointment.component';
import { WalledComponent } from './Admin Dashboard/walled/walled.component';
import { AppointmentListComponent } from './Admin Dashboard/appointment-list/appointment-list.component';
import { AppointmentPaymentComponent } from './controller/appointment-payment/appointment-payment.component';
import { DoctorListComponent } from './Admin Dashboard/doctor-list/doctor-list.component';
import { PatientListComponent } from './Admin Dashboard/patient-list/patient-list.component';
import { EmployeeListComponent } from './Admin Dashboard/employee-list/employee-list.component';
import { LaboratoryComponent } from './controller/laboratory/laboratory.component';
import { ViewTestComponent } from './controller/view-test/view-test.component';
import { TestPaymentComponent } from './controller/test-payment/test-payment.component';
import { MedicinePaymentComponent } from './controller/medicine-payment/medicine-payment.component';
import { PharmasistBilingComponent } from './controller/pharmasist-biling/pharmasist-biling.component';
import { ReportComponent } from './Admin Dashboard/report/report.component';
import { AdminDashboardComponent } from './Admin Dashboard/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './Blank/user-profile/user-profile.component';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    HomeComponent,
    DoctorDashboardComponent,
    BlackComponent,
    MainLayoutComponent,
    DashboardComponent,
    RegistrationComponent,
    LoginComponent,
    DoctorComponent,
    PatientComponent,
    EmployeeComponent,
    ProfitLossComponent,
    PatientDashboardComponent,
    DoctorCardComponent,
    PrescriptionComponent,
    ViewPrescriptionComponent,
    LabPanelComponent,
    LabDashboardComponent,
    AddLabTestComponent,
    AppointmentComponent,
    WalledComponent,
    AppointmentListComponent,
    AppointmentPaymentComponent,
    DoctorListComponent,
    PatientListComponent,
    EmployeeListComponent,
    LaboratoryComponent,
    ViewTestComponent,
    TestPaymentComponent,
    MedicinePaymentComponent,
    PharmasistBilingComponent,
    ReportComponent,
    AdminDashboardComponent,
    UserProfileComponent

  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
