package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.model.TestPayment;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository(value = "testPaymentDAO")
@Transactional
public class TestPaymentDAO {
	

	@Autowired
	private EntityManager entityManager;
	
	
	private Session getSession() {
		return entityManager.unwrap(Session.class);
	}
	
	public TestPayment save(TestPayment p) {
	    getSession().save(p);
	    getSession().flush();
	    return p;
	}

	public List<TestPayment> getAll() {
	    String hql = "from TestPayment";
	    return getSession().createQuery(hql, TestPayment.class).list();
	}

    public TestPayment getTestPaymentById(long id) {
        String hql = "from TestPayment where id = :id";
        return getSession()
                .createQuery(hql, TestPayment.class)
                .setParameter("id", id)
                .uniqueResult();
    }

	
	
	public List<TestPayment> getByTestCode(String testCode) {
	    String hql = "from TestPayment where testCode = :code";
	    return getSession()
	            .createQuery(hql, TestPayment.class)  
	            .setParameter("code", testCode)       
	            .getResultList();                     
	}

	
    
    public TestPayment getTesttestPaymentById(long id) {
        String hql = "from TestPayment where id = :id";
        return getSession()
                .createQuery(hql, TestPayment.class)   
                .setParameter("id", id)                
                .uniqueResult();                       
    }

}
