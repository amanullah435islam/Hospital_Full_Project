package com.hospital.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "labTest")
public class LabTest {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	

	@Column(name = "test_code")
	private long testCode;
	
	@Column(name = "test_type")
	private String testType;
	
	@Column(name = "test_name")
	private String testName;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "reported_by")
	private String reportedBy;
	

	@Column(name = "appointment_code")
	private int appointmentCode;
	
	@Column(name = "appointment_id")
	private int appointmentId;
		
	@Column(name = "prescription_code")
	private int prescriptionCode;
	
	@Column(name = "prescription_id")
	private long prescriptionId;

	@Column(name = "notes")
	private String notes;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getTestCode() {
		return testCode;
	}

	public void setTestCode(int testCode) {
		this.testCode = testCode;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}


	public int getAppointmentCode() {
		return appointmentCode;
	}

	public void setAppointmentCode(int appointmentCode) {
		this.appointmentCode = appointmentCode;
	}

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public int getPrescriptionCode() {
		return prescriptionCode;
	}

	public void setPrescriptionCode(int prescriptionCode) {
		this.prescriptionCode = prescriptionCode;
	}


	public long getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getTestType() {
		return testType;
	}

	public void setTestType(String testType) {
		this.testType = testType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReportedBy() {
		return reportedBy;
	}

	public void setReportedBy(String reportedBy) {
		this.reportedBy = reportedBy;
	}

	
	}

