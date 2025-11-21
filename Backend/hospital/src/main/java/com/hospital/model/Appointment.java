package com.hospital.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointment")
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "appointment_code")
	private int appointmentCode;

	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "patient_code")
	private int patientCode;

	@Column(name = "patient_name")
	private String patientName;

	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "doctor_code")
	private int doctorCode;

	@Column(name = "doctor_name")
	private String doctorName;

	@Column(name = "date")
	private String date;

	@Column(name = "department")
	private String department;

	@Column(name = "status")
	private int status;

	@Column(name = "madicleHistry")
	private String madicleHistry;

	@Column(name = "bookingDate")
	private String bookingDate;

	@Column(name = "paymentStatus")
	private String paymentStatus;


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getAppointmentCode() {
		return appointmentCode;
	}

	public void setAppointmentCode(int appointmentCode) {
		this.appointmentCode = appointmentCode;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMadicleHistry() {
		return madicleHistry;
	}

	public void setMadicleHistry(String madicleHistry) {
		this.madicleHistry = madicleHistry;
	}

	public String getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(String bookingDate) {
		this.bookingDate = bookingDate;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
}
