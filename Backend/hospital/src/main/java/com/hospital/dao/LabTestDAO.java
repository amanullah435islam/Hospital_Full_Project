package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.model.LabTest;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository(value = "labTestDAO")
@Transactional
public class LabTestDAO {
	 @Autowired
	    private EntityManager entityManager;

	    private Session getSession() {
	        return entityManager.unwrap(Session.class);
	    }


	    public LabTest save(LabTest p){
	    	getSession().save(p);
	    	//getSession().flush();
	        return p;
	    }

	    public List<LabTest> getAll(){
	    	String sql = "from LabTest";
	        List<LabTest> test = getSession().createQuery(sql, LabTest.class).list();
	        return test;
	    }

	    public LabTest getLabTestById(long id) {
	        String hql = "from LabTest where id = :id";
	        return getSession()
	                .createQuery(hql, LabTest.class)
	                .setParameter("id", id)
	                .uniqueResult();
	    }

	    
}
