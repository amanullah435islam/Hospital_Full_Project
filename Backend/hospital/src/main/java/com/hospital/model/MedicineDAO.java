package com.hospital.model;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository(value = "medicineDAO")
@Transactional
public class MedicineDAO {
	 @Autowired
	    private EntityManager entityManager;

	    private Session getSession() {
	        return entityManager.unwrap(Session.class);
	    }


	    public Medicine save(Medicine p){
	    	getSession().save(p);
	    	//getSession().flush();
	        return p;
	    }

	    public List<Medicine> getAll(){
	    	String sql = "from Medicine";
	        List<Medicine> medicine = getSession().createQuery(sql, Medicine.class).list();
	        return medicine;
	    }

	    public Medicine getMedicineById(long id) {
	        String hql = "from Medicine where id = :id";
	        return getSession()
	                .createQuery(hql, Medicine.class)
	                .setParameter("id", id)
	                .uniqueResult();
	    }

}
