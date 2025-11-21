package com.hospital.model;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

	@Entity
	@Table(name = "prescription")
	public class Prescription {
		
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private long id;
		
		@Column(name = "prescription_code")
		private Number prescriptionCode;
		
		//patient details
		@Column(name = "patient_id")
		private long patientId;
		
		@Column(name = "patient_code")
		private int patientCode;
		
		@Column(name = "patient_name")
		private String patientName;
		
		@Column(name = "age")
		private int age;

		@Column(name = "dob")
		private Date dob;

		@Column(name = "gender")
		private String gender;

		@Column(name = "phone")
		private String phone;

		@Column(name = "lastVisit")
		private Date lastVisit;
		
		
		//doctor details
		@Column(name = "doctor_id")
		private int doctorId;
		
		@Column(name = "doctor_code")
		private int doctorCode;
		
		@Column(name = "doctor_name")
		private String doctorName;
		
		@Column(name = "specialize")
		private String specialize;

		@Column(name = "contact")
		private String contact;

		@Column(name = "availability")
		private String availability;

		@Column(name = "email")
		private String email;

		@Column(name = "roomNumber")
		private String roomNumber;
		
		
		//appointment details
		@Column(name = "appointment_id")
		private int appointmentId;

		@Column(name = "appointment_code")
		private int appointmentCode;
		
		@Column(name = "date")
		private Date date;

		@Column(name = "department")
		private String department;

		@Column(name = "status")
		private Integer status;

		@Column(name = "madicleHistry")
		private String madicleHistry;

		@Column(name = "bookingDate")
		private Date bookingDate;

		@Column(name = "paymentStatus")
		private String paymentStatus;

		
		
		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public Number getPrescriptionCode() {
			return prescriptionCode;
		}

		public void setPrescriptionCode(Number prescriptionCode) {
			this.prescriptionCode = prescriptionCode;
		}

		public long getPatientId() {
			return patientId;
		}

		public void setPatientId(long patientId) {
			this.patientId = patientId;
		}

		public int getPatientCode() {
			return patientCode;
		}

		public void setPatientCode(int patientCode) {
			this.patientCode = patientCode;
		}

		public String getPatientName() {
			return patientName;
		}

		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}

		public int getAge() {
			return age;
		}

		public void setAge(int age) {
			this.age = age;
		}

		public Date getDob() {
			return dob;
		}

		public void setDob(Date dob) {
			this.dob = dob;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public Date getLastVisit() {
			return lastVisit;
		}

		public void setLastVisit(Date lastVisit) {
			this.lastVisit = lastVisit;
		}

		public int getDoctorId() {
			return doctorId;
		}

		public void setDoctorId(int doctorId) {
			this.doctorId = doctorId;
		}

		public int getDoctorCode() {
			return doctorCode;
		}

		public void setDoctorCode(int doctorCode) {
			this.doctorCode = doctorCode;
		}

		public String getDoctorName() {
			return doctorName;
		}

		public void setDoctorName(String doctorName) {
			this.doctorName = doctorName;
		}

		public String getSpecialize() {
			return specialize;
		}

		public void setSpecialize(String specialize) {
			this.specialize = specialize;
		}

		public String getContact() {
			return contact;
		}

		public void setContact(String contact) {
			this.contact = contact;
		}

		public String getAvailability() {
			return availability;
		}

		public void setAvailability(String availability) {
			this.availability = availability;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getRoomNumber() {
			return roomNumber;
		}

		public void setRoomNumber(String roomNumber) {
			this.roomNumber = roomNumber;
		}

		public int getAppointmentId() {
			return appointmentId;
		}

		public void setAppointmentId(int appointmentId) {
			this.appointmentId = appointmentId;
		}

		public int getAppointmentCode() {
			return appointmentCode;
		}

		public void setAppointmentCode(int appointmentCode) {
			this.appointmentCode = appointmentCode;
		}

		public Date getDate() {
			return date;
		}

		public void setDate(Date date) {
			this.date = date;
		}

		public String getDepartment() {
			return department;
		}

		public void setDepartment(String department) {
			this.department = department;
		}

		public Integer getStatus() {
			return status;
		}

		public void setStatus(Integer status) {
			this.status = status;
		}

		public String getMadicleHistry() {
			return madicleHistry;
		}

		public void setMadicleHistry(String madicleHistry) {
			this.madicleHistry = madicleHistry;
		}

		public Date getBookingDate() {
			return bookingDate;
		}

		public void setBookingDate(Date bookingDate) {
			this.bookingDate = bookingDate;
		}

		public String getPaymentStatus() {
			return paymentStatus;
		}

		public void setPaymentStatus(String paymentStatus) {
			this.paymentStatus = paymentStatus;
		}
		
	}