# 🏥 Hospital Management System

A full-stack **Hospital Management System** designed to manage hospital operations through a modern web application.

The project combines a **Spring Boot REST API backend** with an **Angular frontend** and is designed to support authentication, role-based authorization, patient management, doctor management, appointments, prescriptions, and other core hospital management operations.

The system is currently under active development, with additional hospital modules and features planned for completion.

---

## 📌 Project Overview

The **Hospital Management System (HMS)** is a full-stack web application developed to digitize and manage common hospital operations.

The backend is built using **Java 21 and Spring Boot**, while the frontend is developed using **Angular 20**.

The project focuses on:

* Secure authentication
* Role-based authorization
* User management
* Patient management
* Doctor management
* Appointment management
* Prescription management
* Email verification
* Password recovery
* Google authentication
* Fingerprint / WebAuthn authentication
* RESTful API architecture
* DTO-based communication
* Clean layered architecture

---

# ✨ Key Features

## 🔐 Authentication & Security

The system is designed with a complete authentication and security architecture.

### User Registration

* User registration
* Request validation
* Password encryption
* Role assignment
* Email verification workflow

### 📧 Email Verification

* Verification email after registration
* Verification token
* Account verification
* Secure activation workflow

### 🔑 Login

* Secure login
* JWT-based authentication
* Access Token
* Refresh Token
* Protected API access

### 🔄 Refresh Token

* Access Token refresh
* Refresh Token validation
* Token lifecycle management
* Secure logout/revocation flow

### 🚪 Logout

* Secure logout
* Refresh Token revocation
* Protected session management

---

# 👮 Role-Based Authorization

The system supports role-based access control.

Different users can access different resources depending on their assigned role.

Example roles:

```text
ADMIN
DOCTOR
PATIENT
```

Example access model:

```text
ADMIN
 ├── User Management
 ├── Doctor Management
 ├── Patient Management
 ├── Appointment Management
 └── System Management

DOCTOR
 ├── Patient Information
 ├── Appointments
 └── Prescriptions

PATIENT
 ├── Profile
 ├── Appointments
 └── Prescriptions
```

> Roles and permissions can be expanded as additional hospital modules are implemented.

---

# 🔵 Google Authentication

The authentication architecture includes Google OAuth2 authentication.

```text
User
 ↓
Continue with Google
 ↓
Google Authentication
 ↓
Spring Security OAuth2
 ↓
Backend Authentication
 ↓
Application Authentication
 ↓
Protected Application
```

---

# 👆 Fingerprint / WebAuthn Authentication

The project also includes a modern passwordless authentication direction using **WebAuthn / fingerprint authentication**.

```text
Browser
   ↓
Fingerprint / WebAuthn
   ↓
Credential Verification
   ↓
Spring Boot Backend
   ↓
Authentication
   ↓
Secure Application Access
```

> Availability of fingerprint authentication depends on browser, operating system, device, and WebAuthn support.

---

# 🔑 Forgot Password

Users can recover their account through the password recovery workflow.

```text
Forgot Password
      ↓
Enter Email
      ↓
Reset Request
      ↓
Reset Link / Token
      ↓
Token Verification
      ↓
New Password
      ↓
Password Encryption
      ↓
Password Updated
```

---

# 🔄 Reset Password

The password reset process allows a verified reset request to update the user's password securely.

Passwords are encrypted before being stored in the database.

---

# 👤 User Management

The system provides a foundation for managing application users.

Potential operations include:

* Create User
* View Users
* View User Details
* Update User
* Delete User
* Role Management
* Account Status Management

---

# 🧑‍⚕️ Patient Management

The Patient module is designed to manage patient-related information.

Possible operations include:

* Add Patient
* View Patients
* View Patient Details
* Update Patient
* Delete Patient
* Patient Profile
* Patient Appointment History
* Patient Prescription Information

---

# 👨‍⚕️ Doctor Management

The Doctor module is designed to manage doctor information and their hospital activities.

Possible operations include:

* Add Doctor
* View Doctors
* View Doctor Details
* Update Doctor
* Delete Doctor
* Doctor Profile
* Doctor Appointments
* Doctor Prescriptions

---

# 📅 Appointment Management

The Appointment module is designed to manage doctor-patient appointments.

```text
Patient
   ↓
Select Doctor
   ↓
Select Date / Time
   ↓
Create Appointment
   ↓
Doctor Reviews Appointment
   ↓
Appointment Status
```

Planned/extendable appointment statuses:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
```

---

# 💊 Prescription Management

The Prescription module is designed to manage prescriptions created by doctors for patients.

A prescription can be extended to contain:

* Patient Information
* Doctor Information
* Diagnosis
* Medicines
* Dosage
* Tests
* Instructions
* Prescription Date

Example flow:

```text
Doctor
  ↓
Select Patient
  ↓
Create Prescription
  ↓
Add Medicine / Test
  ↓
Save Prescription
  ↓
Patient Can View Prescription
```

---

# 🏗️ Full-Stack Architecture

```text
                    ┌─────────────────────┐
                    │       Angular       │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Spring Boot     │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │ Spring Security │        │  Business Logic │
        │      + JWT      │        │    / Service    │
        └─────────────────┘        └────────┬────────┘
                                            │
                                            ▼
                                  ┌─────────────────┐
                                  │ Spring Data JPA │
                                  │   / Hibernate   │
                                  └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │    Database     │
                                  └─────────────────┘
```

---

# 🧩 Backend Architecture

The backend follows a layered architecture.

```text
Backend
│
├── Controller
│
├── Service
│
├── Repository
│
├── Entity / Model
│
├── DTO
│
├── Mapper
│
├── Security
│
├── Validation
│
├── Exception
│
└── Configuration
```

### Layer Responsibilities

| Layer         | Responsibility                     |
| ------------- | ---------------------------------- |
| Controller    | Handles REST API requests          |
| Service       | Contains business logic            |
| Repository    | Database operations                |
| Entity        | Database/domain representation     |
| DTO           | API request/response data          |
| Mapper        | Entity ↔ DTO conversion            |
| Security      | Authentication & authorization     |
| Validation    | Input/business validation          |
| Exception     | Centralized exception handling     |
| Configuration | Application/security configuration |

---

# 🎨 Frontend Architecture

The frontend is developed using Angular.

A scalable Angular structure can be organized as:

```text
src/app
│
├── core
│   ├── guards
│   ├── interceptors
│   ├── services
│   └── models
│
├── shared
│   ├── components
│   ├── directives
│   └── pipes
│
├── features
│   ├── authentication
│   ├── users
│   ├── patients
│   ├── doctors
│   ├── appointments
│   └── prescriptions
│
└── layout
```

This structure keeps application-wide services separate from feature-specific modules.

---

# 🔄 Authentication Flow

```text
Angular Login Page
        ↓
Authentication API
        ↓
Spring Security
        ↓
Validate Credentials
        ↓
Generate JWT
        ↓
Angular Receives Token
        ↓
Store Authentication State
        ↓
HTTP Interceptor
        ↓
Attach Bearer Token
        ↓
Protected REST API
```

---

# 🛡️ Protected Route Flow

```text
Angular Route
      ↓
Auth Guard
      ↓
Authenticated?
   ↙       ↘
 YES        NO
  ↓          ↓
Access     Login
Page       Page
```

---

# 🔌 REST API Architecture

The Angular frontend communicates with the Spring Boot backend through REST APIs.

```text
Angular
   │
   │ HTTP Request
   ▼
REST Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Database
```

Response:

```text
Database
   ↓
Repository
   ↓
Service
   ↓
Response DTO
   ↓
REST Controller
   ↓
Angular
```

---

# 📦 DTO-Based Communication

The project follows a DTO-oriented API design.

### Request

```text
Angular
   ↓
Request DTO
   ↓
Controller
   ↓
Service
   ↓
Entity
```

### Response

```text
Entity
   ↓
Service
   ↓
Response DTO
   ↓
Controller
   ↓
Angular
```

Typical CRUD pattern:

| Operation | Request DTO | Response DTO |
| --------- | ----------: | -----------: |
| Save      |           ✅ |            ✅ |
| Get All   |           ❌ |            ✅ |
| Get By ID |           ❌ |            ✅ |
| Update    |           ✅ |            ✅ |
| Delete    |           ❌ |     Optional |

---

# 🛡️ Exception Handling

The backend is designed to use centralized exception handling.

Typical errors can include:

* Resource Not Found
* Invalid Request
* Validation Error
* Unauthorized Access
* Forbidden Access
* Duplicate Data
* Authentication Failure
* Invalid/Expired Token

A centralized exception handler can provide consistent API responses to the Angular frontend.

---

# 🗄️ Database Architecture

The backend uses JPA/Hibernate for persistence.

The database layer is designed around major hospital entities such as:

```text
User
Patient
Doctor
Appointment
Prescription
```

Additional hospital modules and entities can be added as development continues.

---

# 🛠️ Technologies & Versions

## Backend

| Technology      | Version                    |
| --------------- | -------------------------- |
| Java            | 21.0.10 LTS                |
| Spring Boot     | Project configured version |
| Spring Security | Project configured version |
| Spring Data JPA | Project configured version |
| Hibernate       | Project configured version |
| Maven           | Project configured version |
| JWT             | Project dependency         |
| OAuth2          | Spring Security OAuth2     |

## Frontend

| Technology  | Version                 |
| ----------- | ----------------------- |
| Angular CLI | 20.3.15                 |
| Node.js     | 24.11.0                 |
| npm         | 11.6.1                  |
| TypeScript  | Angular project version |

## Operating System

```text
Windows x64
```

---

# 📂 Full Project Structure

```text
Hospital_Full_Project
│
├── backend
│   ├── src
│   │   └── main
│   │       ├── java
│   │       └── resources
│   │
│   └── pom.xml
│
├── frontend
│   ├── src
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

> Adjust the top-level folder names if your repository uses a different backend/frontend directory structure.

---

# ▶️ How to Run

## 1. Clone Repository

```bash
git clone https://github.com/amanullah435islam/Hospital_Full_Project.git
```

---

## 2. Backend Setup

Open the backend project in IntelliJ IDEA or Eclipse.

Configure:

```text
application.properties
```

or

```text
application.yml
```

with your database, email, JWT, OAuth2, and other required environment-specific settings.

Then run the Spring Boot application.

Using Maven:

```bash
mvn spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

---

# 3. Frontend Setup

Navigate to the Angular project:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run Angular development server:

```bash
ng serve
```

or:

```bash
npm start
```

Then open the application in your browser.

---

# ⚙️ Environment Configuration

For security, sensitive information should not be hardcoded into source code.

Examples include:

```text
Database Password
JWT Secret
Google Client ID
Google Client Secret
SMTP Username
SMTP Password
WebAuthn Configuration
```

Use environment variables or local configuration for development and production environments.

**Never commit real credentials, private keys, or secrets to GitHub.**

---

# 🧪 Development & Testing Flow

A typical authentication flow:

```text
1. User Registration
        ↓
2. Email Verification
        ↓
3. Login
        ↓
4. Access + Refresh Token
        ↓
5. Protected Angular Routes
        ↓
6. Role-Based API Access
        ↓
7. Logout / Token Revocation
```

Password recovery:

```text
Forgot Password
      ↓
Email
      ↓
Reset Token
      ↓
Reset Password
      ↓
Login with New Password
```

---

# 📊 Hospital Management Flow

```text
                    Hospital System
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
        Admin           Doctor           Patient
          │                │                │
          │                │                │
          ▼                ▼                ▼
      Users            Patients        Appointments
      Doctors          Appointments   Prescriptions
      Patients         Prescriptions
```

---

# 📈 Planned / In-Progress Modules

The project is under active development.

Planned or extendable modules include:

* 🧑‍⚕️ Doctor Management
* 🧑‍🤝‍🧑 Patient Management
* 📅 Appointment Management
* 💊 Prescription Management
* 🏥 Department Management
* 🛏️ Bed & Ward Management
* 🔬 Diagnostics
* 💰 Billing & Payment
* 💊 Pharmacy / Medicine Inventory
* 📊 Reports & Analytics
* 👥 Advanced User Management
* 🔐 Advanced Security Features
* 📧 Notification System

Only completed modules should be marked as **Implemented** as development progresses.

---

# 🚀 Future Enhancements

Possible future improvements:

* Advanced Dashboard
* Real-time notifications
* Appointment reminders
* Doctor availability management
* Patient medical history
* Prescription PDF generation
* Billing and invoice management
* Pharmacy inventory management
* Advanced reporting
* Audit logging
* Login activity tracking
* Device/session management
* Automated unit and integration testing
* Docker containerization
* CI/CD pipeline
* Production deployment

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* Refresh Token
* OAuth2 / Google Authentication
* WebAuthn / Fingerprint Authentication
* BCrypt Password Encryption
* Spring Data JPA
* Hibernate
* REST API
* DTO Pattern
* Mapper Pattern
* Role-Based Authorization
* Request Validation
* Global Exception Handling
* Layered Architecture

### Frontend

* Angular 20
* TypeScript
* Angular Services
* Route Guards
* HTTP Interceptors
* REST API Integration
* Authentication State Management
* Role-Based UI Access
* Reactive Forms
* Component-Based Architecture

### Full-Stack

* Frontend ↔ Backend Integration
* REST API Communication
* Authentication Flow
* Authorization
* Secure API Consumption
* Database Integration

---

# 📌 Project Status

**Status:** 🚧 In Progress

The core authentication/security architecture and major hospital-management foundations are being developed.

Additional hospital modules, frontend screens, integrations, testing, and production-level improvements will be implemented progressively.

---

# 👨‍💻 Developed By

**Md. Amanullah Islam**

Software Developer

**Technologies:**

```text
Java
Spring Boot
Spring Security
Angular
TypeScript
JPA / Hibernate
REST API
JWT
OAuth2
WebAuthn
```

---

# 🔗 Repository

**GitHub Repository**

https://github.com/amanullah435islam/Hospital_Full_Project

---

# 📄 License

This project is developed for educational, portfolio, and software development purposes.

The project is actively evolving as new hospital-management features are implemented.
