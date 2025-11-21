package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.model.Prescription;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

	@Repository(value = "prescriptionDAO")
	@Transactional
	public class PrescriptionDAO  {
		@Autowired
	    private EntityManager entityManager;

	    private Session getSession() {
	        return entityManager.unwrap(Session.class);
	    }


	    public Prescription save(Prescription p){
	    	getSession().save(p);
	    	//getSession().flush();
	        return p;
	    }

	    public List<Prescription> getAll(){
	    	String sql = "from Prescription";
	        List<Prescription> prescription = getSession().createQuery(sql, Prescription.class).list();
	        return prescription;
	    }

	   

	    public Prescription getPrescriptionById(long id) {
	        String jpql = "SELECT p FROM Prescription p LEFT JOIN FETCH p.prescriptionMedicines WHERE p.id = :id";
	        return entityManager.createQuery(jpql, Prescription.class)
	                            .setParameter("id", id)
	                            .getSingleResult();
	    }
  
	}