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
import com.hospital.dao.LabTestDAO;
import com.hospital.model.LabTest;


//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/labtest")
public class LabTestController {
	@Autowired
    private LabTestDAO labTestDAO;

    @GetMapping("/labTest")
    public List<LabTest> getAllLabTests() {
        return labTestDAO.getAll();
    }

    @GetMapping("/labTest/{id}")
    public ResponseEntity<LabTest> getLabTestById(@PathVariable(value = "id") int id) {
    	LabTest l = labTestDAO.getLabTestById(id);
        return ResponseEntity.ok().body(l);
    }

    @PostMapping("/save")
    public LabTest save(@RequestBody LabTest l) {
        return labTestDAO.save(l);
    }
}