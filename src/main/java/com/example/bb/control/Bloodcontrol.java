package com.example.bb.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bb.Bloodentity.Blood;
import com.example.bb.Request.Receiver;
import com.example.bb.SLC.Login;
import com.example.bb.SLC.Signin;
import com.example.bb.bservice.BloodService;
import com.example.bb.mailservice.EmailService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Your frontend port
public class Bloodcontrol {

    private final BloodService bloodService;
    private final EmailService emailService;
    private final Map<String, String> otpStore = new HashMap<>();

    @Autowired
    public Bloodcontrol(BloodService bloodService, EmailService emailService) {
        this.bloodService = bloodService;
        this.emailService = emailService;
    }
    
    
    
    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }

        String otp = String.format("%06d", (int)(Math.random() * 900000) + 100000); // 6-digit OTP
        otpStore.put(email, otp);

        // Send OTP by email
        emailService.sendOtpEmail(email, otp);

        return ResponseEntity.ok(Map.of("message", "OTP sent to your email"));
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody Signin signinData) {
        String email = signinData.getEmail();
        String enteredOtp = signinData.getOtp();

        String correctOtp = otpStore.get(email);
        if (correctOtp == null || !correctOtp.equals(enteredOtp)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid OTP"));
        }

        boolean success = bloodService.signup(signinData);
        if (success) {
            otpStore.remove(email); // OTP is now useless
            return ResponseEntity.ok(Map.of("message", "Signup successful"));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Signup failed"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Login loginData) {
        Signin user = bloodService.login(loginData);
        if (user != null) {
            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }
    
    //REGISTER
    @PostMapping("/submit")
    public Blood submit(@RequestBody Blood data) {
        return bloodService.register(data);	   
    }
    
    //FIND DONORS
    @PostMapping("/donors")
    public List<Blood> getDonorsByBloodGroup(
            @RequestBody(required = false) String bloodGroup) {
        
        return bloodService.donors(bloodGroup);
    }
    
    
}
