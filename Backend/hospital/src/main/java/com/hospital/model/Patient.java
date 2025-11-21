package com.hospital.model;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "patient")
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;	

	@Column(name = "patient_code")
	private int patientCode;
	
	@Column(name = "patient_name")
	private String patientName;
	

	@Column(name = "visit_amount") 
	private int visitAmount;


	@Column(name = "age")
	private int age;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dob;

	@Column(name = "gender")
	private String gender;

	@Column(name = "phone")
	private String phone;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date lastVisit;
	
	

	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
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


	public int getVisitAmount() {
		return visitAmount;
	}


	public void setVisitAmount(int visitAmount) {
		this.visitAmount = visitAmount;
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

}


