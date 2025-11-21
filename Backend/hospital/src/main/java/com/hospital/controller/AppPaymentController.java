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
import com.hospital.dao.AppPaymentDAO;
import com.hospital.model.AppPayment;

	//@CrossOrigin(origins = "*")
	@RestController
	@RequestMapping("/api/appPayment")
	public class AppPaymentController {

		@Autowired
		AppPaymentDAO paymentDAO;

		
		   @GetMapping("/{id}")
		    public ResponseEntity<AppPayment> getById(@PathVariable(value = "id") int id) {
			   AppPayment p = paymentDAO.getAppPaymentById(id);
		        return ResponseEntity.ok().body(p);
		    }

		   
		    @PostMapping("/save")
		    public AppPayment save(@RequestBody AppPayment p) {
		        return paymentDAO.save(p);
		    }
		    
		    @GetMapping("/all")
		    public List<AppPayment> getAllPayment() {
		        return paymentDAO.getAll();
		    }

	}

