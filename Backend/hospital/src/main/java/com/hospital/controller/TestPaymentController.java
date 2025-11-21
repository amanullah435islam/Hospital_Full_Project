package com.hospital.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dao.TestPaymentDAO;
import com.hospital.model.TestPayment;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/TestPayment")
public class TestPaymentController {

	@Autowired
	TestPaymentDAO testPaymentDAO;

	
	   @GetMapping("/{id}")
	    public ResponseEntity<TestPayment> getTestPaymentById(@PathVariable(value = "id") int id) {
		   TestPayment p = testPaymentDAO.getTestPaymentById(id);
	        return ResponseEntity.ok().body(p);
	    }
		
		@GetMapping("/all")
		public List<TestPayment> getAllTestPayments() {
		    return testPaymentDAO.getAll();
		}

	   
	   @PostMapping("/save")
	    public TestPayment createTestPayment(@RequestBody TestPayment testPayment) {
	        return testPaymentDAO.save(testPayment);
	    }

	    @GetMapping("/check/{testCode}")
	    public boolean isTestPaid(@PathVariable String testCode) {
	        List<TestPayment> payments = testPaymentDAO.getByTestCode(testCode);
	        return !payments.isEmpty(); 
	    }

	   

}
