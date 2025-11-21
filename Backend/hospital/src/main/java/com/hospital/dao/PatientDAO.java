package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.model.Patient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

@Transactional
@Repository(value = "patientDAO")
public class PatientDAO {

	@Autowired
	private EntityManager entityManager;
	
	private Session getSession() {
		return entityManager.unwrap(Session.class);
	}
	
	
	public Patient save(Patient p) {
		getSession().save(p);
		//getSession().flush();   
		return p;
	}
	
	
	//same way te just akta variable a reke oi variable ta return korci....!
	public List<Patient> getAll() {
	    String hql = "from Patient";
	    return getSession().createQuery(hql, Patient.class).list();
	}

	
		public Patient getByID(long id) {
			String hql = "from Patient where id = :id";
		    return getSession().createQuery(hql, Patient.class)
		            .setParameter("id", id)
		            .getSingleResult(); 
		}
	
	
		 public Patient delete(Patient p) {	 
			 String hql = "delete from Patient where id = :id";
			     getSession().createQuery(hql)
			            .setParameter("id", p.getId())
			            .executeUpdate();	     
			     return p; 
		 }
	 

	 public Patient update(Patient p) {
		    String hql = "update Patient set patientCode = :code, patientName = :name, age = :age, dob = :dob, " +
		                 "gender = :gender, phone = :phone, lastVisit = :lastVisit, visitAmount = :visitAmount " +
		                 "where id = :id";
		    Query q = getSession().createQuery(hql);
		    q.setParameter("code", p.getPatientCode());
		    q.setParameter("name", p.getPatientName());
		    q.setParameter("age", p.getAge());
		    q.setParameter("dob", p.getDob());
		    q.setParameter("gender", p.getGender());
		    q.setParameter("phone", p.getPhone());
		    q.setParameter("lastVisit", p.getLastVisit());
		    q.setParameter("visitAmount", p.getVisitAmount());
		    q.setParameter("id", p.getId());
		    q.executeUpdate();
		    getSession().flush();
		    return p;
		}	 

}
