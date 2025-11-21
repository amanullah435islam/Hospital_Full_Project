package com.hospital.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicine")
public class Medicine {
		
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	
	@Column(name = "medicine_code")
	private long medicineCode;
	
	@Column(name = "medicine_name")
	private String medicineName;
	

    
	@Column(name = "appointment_code")
	private int appointmentCode;
	
	@Column(name = "appointment_id")
	private int appointmentId;
		
	@Column(name = "prescription_code")
	private int prescriptionCode;
	
	@Column(name = "prescription_id")
	private long prescriptionId;
	
	@Column(name = "dose")
	private String dose;
	
	@Column(name = "frequency")
	private String frequency;
	
	@Column(name = "duration")
	private String duration;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public long getMedicineCode() {
		return medicineCode;
	}

	public void setMedicineCode(int medicineCode) {
		this.medicineCode = medicineCode;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
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

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	} 