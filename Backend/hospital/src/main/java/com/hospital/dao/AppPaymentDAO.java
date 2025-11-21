package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.model.AppPayment;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

	@Repository(value = "appPaymentDAO")
	@Transactional
	public class AppPaymentDAO  {

		@Autowired
		private EntityManager entityManager;
		
		
		private Session getSession() {
			return entityManager.unwrap(Session.class);
		}
		
	    public AppPayment save(AppPayment p){
	    	getSession().save(p);
	    	//getSession().flush();
	        return p;
	    }

	    public List<AppPayment> getAll(){
	    	String sql = "from AppPayment";
	        List<AppPayment> AppPayment = getSession().createQuery(sql, AppPayment.class).list();
	        return AppPayment;
	    }

	  
	    public AppPayment getAppPaymentById(long id) {
	        String hql = "from AppPayment where id = :id";
	        return getSession()
	                .createQuery(hql, AppPayment.class)
	                .setParameter("id", id)
	                .uniqueResult();
	    }


	}
