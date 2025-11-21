package com.hospital.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.dao.AppointmentDAO;
import com.hospital.dao.DoctorDAO;
import com.hospital.dao.PatientDAO;
import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.Patient;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController  {

	@Autowired
    private AppointmentDAO appointmentDAO;

	@Autowired
	private PatientDAO patientDAO;

	@Autowired
	private DoctorDAO doctorDAO;
	


	@GetMapping("/appointment/getMeta")
	public Map<String, Object> getAllMeta() {
		List<Appointment> apps = appointmentDAO.getAll();
		List<Patient> ptns = patientDAO.getAll();
		List<Doctor> dcrs = doctorDAO.getAll();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("Appointment", apps);
		map.put("patient", ptns);
		map.put("doctor", dcrs);


		return map;
	}
	
    @GetMapping("/appointment")
    public List<Appointment> getAllAppointments() {
        return appointmentDAO.getAll();
    }
    
    
    @GetMapping("/appointment/approve")
    public List<Appointment> getAllApp() {
        return appointmentDAO.getAllApp();
    }
    
    
    
    @GetMapping("/appointment/{id}")
    public ResponseEntity<Appointment> getEmployeeById(@PathVariable(value = "id") long employeeId) {
    	Appointment appointment = appointmentDAO.getAppointmentById(employeeId);
        return ResponseEntity.ok().body(appointment);
    }

    
    
    
    @PostMapping("/appointment")
    public Appointment createEmployee(@RequestBody Appointment appointment) {
    	appointment.setStatus(0);
        return appointmentDAO.save(appointment);
    }

    
    @PutMapping("/appointment/{id}")
    public ResponseEntity<Appointment> updateEmployee(@PathVariable(value = "id") int id,
         @Validated @RequestBody Appointment appointmentDetails) {
    	Appointment appointment = appointmentDAO.getAppointmentById(id);
    	//appointment.setStatus(1);
    	appointment.setStatus(appointmentDetails.getStatus()); 


    	
        final Appointment updatedPatient = appointmentDAO.update(appointment);
        return ResponseEntity.ok(updatedPatient);
    }

    
    @DeleteMapping("/appointment/{id}")
    public Map<String, Boolean> deleteAppointment(@PathVariable(value = "id") int id){
    	Appointment appointment = appointmentDAO.getAppointmentById(id);
    	appointmentDAO.delete(appointment);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

