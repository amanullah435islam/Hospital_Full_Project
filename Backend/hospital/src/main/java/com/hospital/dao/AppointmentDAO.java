package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.model.Appointment;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository(value = "appointmentDAO")
@Transactional
public class AppointmentDAO {
	
	@Autowired
    private EntityManager entityManager;

    private Session getSession() {
        return entityManager.unwrap(Session.class);
    }


    public Appointment save(Appointment p){
    	getSession().save(p);
    	//getSession().flush();
        return p;
    }

    public List<Appointment> getAll(){
    	String sql = "from Appointment";
    	return getSession().createQuery(sql, Appointment.class).list();
    }
   

    public List<Appointment> getAllApp(){
    	String sql = "from Appointment where status=1";
        List<Appointment> appointment = getSession().createQuery(sql).list();
        return appointment;
    }



    public Appointment update(Appointment p) {        
    	var hql = "update Appointment set status = :status where id = :id";
    	var query = getSession().createQuery(hql);
    	query.setParameter("status", p.getStatus());
    	query.setParameter("id", p.getId());
    	query.executeUpdate();

    	 getSession().flush();
       return p;
    }

    
    public Appointment getAppointmentById(long id) {
		String hql = "from Appointment where id = :id";
	    return getSession().createQuery(hql, Appointment.class)
	            .setParameter("id", id)
	            .getSingleResult(); 
	}



    public Appointment delete(Appointment p) {	 
		 String hql = "delete from Appointment where id = :id";
		     getSession().createQuery(hql)
		            .setParameter("id", p.getId())
		            .executeUpdate();	     
		     return p; 
	 }

}


