package com.hospital.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.hospital.model.User;
import com.hospital.repository.UserRepository;
import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository repo) {
        this.userRepository = repo;
    }

    // For authentication
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username);
        if (u == null) {
            throw new UsernameNotFoundException("User not found");
        }
        // map role to granted authority
        SimpleGrantedAuthority auth = new SimpleGrantedAuthority("ROLE_" + u.getUserRole());
        return new org.springframework.security.core.userdetails.User(u.getUsername(), u.getPassword(), Collections.singleton(auth));
    }

    // helper to register new user (password already encoded by caller)
    public User save(User user) {
        return userRepository.save(user);
    }
    
    
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username) != null;
    }

}

