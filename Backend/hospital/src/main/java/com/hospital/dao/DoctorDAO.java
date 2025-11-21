package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.model.Doctor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

@Repository(value = "doctorDAO")
@Transactional
public class DoctorDAO {


	 	@Autowired
	    private EntityManager entityManager;

	    private Session getSession() {
	        return entityManager.unwrap(Session.class);
	    }


	    public Doctor save(Doctor p){
	    	getSession().save(p);
	    	//getSession().flush();
	        return p;
	    }

	    public List<Doctor> getAll() {
		    String hql = "from Doctor";
		    return getSession().createQuery(hql, Doctor.class).list();
		}

		public Doctor getDoctorById(long id) {
		    String hql = "from Doctor where id = :id";
		    List<Doctor> result = getSession().createQuery(hql, Doctor.class)
		            .setParameter("id", id)
		            .getResultList();

		    if (result.isEmpty()) {
		        return null; // বা তুমি চাইলে custom exception throw করতে পারো
		    }
		    return result.get(0);
		}


	    public Doctor update(Doctor doctor) {
	        String hql = "update Doctor set " +
	                     "doctorCode = :code, " +
	                     "doctorName = :name, " +
	                     "specialize = :specialize, " +
	                     "contact = :contact, " +
	                     "availability = :availability, " +
	                     "email = :email, " +
	                     "roomNumber = :roomNumber, " +
	                     "description = :description, " +
	                     "image = :image " +
	                     "where id = :id";

	        Query query = getSession().createQuery(hql);
	        query.setParameter("code", doctor.getDoctorCode());
	        query.setParameter("name", doctor.getDoctorName());
	        query.setParameter("specialize", doctor.getSpecialize());
	        query.setParameter("contact", doctor.getContact());
	        query.setParameter("availability", doctor.getAvailability());
	        query.setParameter("email", doctor.getEmail());
	        query.setParameter("roomNumber", doctor.getRoomNumber());
	        query.setParameter("description", doctor.getDescription());
	        query.setParameter("image", doctor.getImage());
	        query.setParameter("id", doctor.getId());

	        query.executeUpdate();
	        getSession().flush();

	        return doctor;
	    }

	    
		 public Doctor delete(Doctor d) {	 
			 String hql = "delete from Doctor where id = :id";
			     getSession().createQuery(hql)
			            .setParameter("id", d.getId())
			            .executeUpdate();	     
			     return d; 
		 }
	 
}