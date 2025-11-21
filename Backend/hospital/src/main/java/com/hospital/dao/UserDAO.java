package com.hospital.dao;

import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hospital.enums.Role;
import com.hospital.model.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository(value = "userDAO")
@Transactional
public class UserDAO{

    @Autowired
    private EntityManager entityManager;

    private Session getSession() {
        return entityManager.unwrap(Session.class);
    }

    public User getByUsernameAndPassword(String username, String password, Role userRole) {
        String hql = "from User where username = :username and password = :password and userRole = :role";
        List<User> users = getSession()
                .createQuery(hql, User.class)
                .setParameter("username", username)
                .setParameter("password", password)
                .setParameter("role", userRole)
                .list();
        return users.isEmpty() ? null : users.get(0);
    }

    public User getUserByUsername(String username) {
        String hql = "from User where username = :username";
        List<User> users = getSession()
                .createQuery(hql, User.class)
                .setParameter("username", username)
                .list();
        return users.isEmpty() ? null : users.get(0);
    }

    public User save(User u) {
        getSession().saveOrUpdate(u);
        getSession().flush();
        return u;
    }

    public List<User> getAll() {
        String hql = "from User";
        return getSession().createQuery(hql, User.class).list();
    }

    public User getUserById(long id) {
        return getSession().get(User.class, id);
    }
	
    
}

