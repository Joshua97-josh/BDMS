package com.example.bb.bloodRequest;


import com.example.bb.model1.DonorInfo;
import com.example.bb.Request.Receiver;
import com.example.bb.bservice1.BloodService;
import com.example.bb.mailservice.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class BloodControl {

    private final BloodService bloodService;
    private final EmailService emailService;

    @Autowired
    public BloodControl(BloodService bloodService, EmailService emailService) {
        this.bloodService = bloodService;
        this.emailService = emailService;
    }

    @PostMapping("/request-blood")
    public ResponseEntity<Map<String, String>> requestBlood(@RequestBody Receiver data) {
        double lat = data.getLatitude();
        double lon = data.getLongitude();
        String bloodGroup = data.getBloodGroup();

        // Step 1: Get predicted donors (from bloodService)
        List<DonorInfo> donors = bloodService.findDonors(lat, lon, bloodGroup);

        // Step 2: Send email to each donor
        for (DonorInfo donor : donors) {
            emailService.sendDonationRequestEmail(donor.getEmail(), bloodGroup);
        }

        // Step 3: Return response
        if (donors.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "No donors found"));
        } else {
            return ResponseEntity.ok(Map.of("message", "Request completed and emails sent"));
        }
    }
}

