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

import com.hospital.dao.PrescriptionDAO;
import com.hospital.model.Prescription;


	//@CrossOrigin(origins = "*")
	@RestController
	@RequestMapping("/api/prescription")  
	public class PrescriptionController {

		@Autowired
	    private PrescriptionDAO prescriptionDAO;

	    @GetMapping("/prescription")
	    public List<Prescription> getAllPrescription() {
	        return prescriptionDAO.getAll();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Prescription> getById(@PathVariable(value = "id") int id) {
	    	Prescription p = prescriptionDAO.getPrescriptionById(id);
	        return ResponseEntity.ok().body(p);
	    }

	    @PostMapping("/save")
	    public Prescription createEmployee(@RequestBody Prescription p) {
	        return prescriptionDAO.save(p);
	    }
	    
	}
	
	
