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

import com.hospital.model.Medicine;
import com.hospital.model.MedicineDAO;


//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/medicine")
public class MedicineController {
	@Autowired
    private MedicineDAO medicineDAO;

    @GetMapping("/medicine")
    public List<Medicine> getAllMedicines() {
        return medicineDAO.getAll();
    }

    @GetMapping("/medicine/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable(value = "id") int id) {
    	Medicine m = medicineDAO.getMedicineById(id);
        return ResponseEntity.ok().body(m);
    }

    @PostMapping("/save")
    public Medicine save(@RequestBody Medicine m) {
        return medicineDAO.save(m);
    }
}

