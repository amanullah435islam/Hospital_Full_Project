package com.hospital.controller;


import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.config.JwtTokenProvider;
import com.hospital.dao.UserDAO;
import com.hospital.enums.Role;
import com.hospital.model.User;
import com.hospital.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    private UserDAO userDAO;
    
    public UserController(AuthenticationManager authenticationManager, UserService userService,
                          PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request) {
        try {

            // 1. Check username exists
            if (userService.existsByUsername(request.getUsername())) {
                return ResponseEntity.badRequest().body("Username already exists!");
            }

            // 2. Check password match
            if (!request.getPassword().equals(request.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("Passwords do not match!");
            }

            // 3. Set role safely
            Role role = request.getUserRole() != null ? request.getUserRole() : Role.Patient;

            // 4. Create new user
            User user = new User();
            user.setUserCode(request.getUserCode());
            user.setName(request.getName());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setUserRole(role);

            // Optional but safe (prevent null)
            user.setImageUrl(request.getImageUrl() != null ? request.getImageUrl() : "");

            // Save user
            User savedUser = userService.save(user);

            // 5. Generate token
            Authentication auth = new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    request.getPassword()
            );

            String jwtToken = jwtTokenProvider.generateToken(auth);

            // 6. Response map
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            response.put("token", jwtToken);

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", savedUser.getId());
            userInfo.put("username", savedUser.getUsername());
            userInfo.put("name", savedUser.getName());
            userInfo.put("email", savedUser.getEmail());
            userInfo.put("role", savedUser.getUserRole().name()); // ENUM -> STRING
            userInfo.put("userCode", savedUser.getUserCode());
            response.put("user", userInfo);
                       
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Registration failed: " + e.getMessage());
        }
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            String token = jwtTokenProvider.generateToken(auth);
            return ResponseEntity.ok("{\"token\": \"" + token + "\"}");       
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

  // Optional: logout can be done by client calling /logout (handled by Spring Security)
    
}





