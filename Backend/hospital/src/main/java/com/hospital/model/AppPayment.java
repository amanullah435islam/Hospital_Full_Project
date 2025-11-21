package com.hospital.model;

import java.util.Date;
import com.hospital.enums.PaymentMethod;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

	@Entity
	@Table(name = "appPayment")
	public class AppPayment {
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private long id;

		@Column(name = "payment_code")
		private int paymentCode;

		@Column(name = "patient_id")
		private int patientId;
		
		@Column(name = "patient_name")
		private String patientName;

		@Column(name = "paymentDate")
		private Date paymentDate;

		@Column(name = "amount")
		private int amount;

		@Enumerated(EnumType.STRING)
		private PaymentMethod paymentMethod;
		
		@Column(name = "mobile_number")
		private String mobileNumber;

		@Column(name = "transaction_id")
		private String transactionId;

		@Column(name = "card_number")
		private String cardNumber;

		@Column(name = "card_expiry")
		private String cardExpiry;



		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public int getPaymentCode() {
			return paymentCode;
		}

		public void setPaymentCode(int paymentCode) {
			this.paymentCode = paymentCode;
		}

		public int getPatientId() {
			return patientId;
		}

		public void setPatientId(int patientId) {
			this.patientId = patientId;
		}

		public String getPatientName() {
			return patientName;
		}

		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}

		public Date getPaymentDate() {
			return paymentDate;
		}

		public void setPaymentDate(Date paymentDate) {
			this.paymentDate = paymentDate;
		}

		public int getAmount() {
			return amount;
		}

		public void setAmount(int amount) {
			this.amount = amount;
		}

		public PaymentMethod getPaymentMethod() {
			return paymentMethod;
		}

		public void setPaymentMethod(PaymentMethod paymentMethod) {
			this.paymentMethod = paymentMethod;
		}

		public String getMobileNumber() {
			return mobileNumber;
		}

		public void setMobileNumber(String mobileNumber) {
			this.mobileNumber = mobileNumber;
		}

		public String getTransactionId() {
			return transactionId;
		}

		public void setTransactionId(String transactionId) {
			this.transactionId = transactionId;
		}

		public String getCardNumber() {
			return cardNumber;
		}

		public void setCardNumber(String cardNumber) {
			this.cardNumber = cardNumber;
		}

		public String getCardExpiry() {
			return cardExpiry;
		}

		public void setCardExpiry(String cardExpiry) {
			this.cardExpiry = cardExpiry;
		}
		
		
	}
