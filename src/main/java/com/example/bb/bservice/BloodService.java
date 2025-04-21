package com.example.bb.bservice;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.bb.Bloodentity.Blood;
import com.example.bb.Request.Receiver;
import com.example.bb.SLC.Login;
import com.example.bb.SLC.Signin;
import com.example.bb.SigninRepo.SignupRepo;
import com.example.bb.bloodrepo.BloodRepo;
import com.example.bb.model1.DonorInfo;

@Service("Blood_service")
public class BloodService {

    private final BloodRepo bloodRepo;
    private final SignupRepo signupRepo;
    private final RestTemplate restTemplate;
    private final String flaskUrl = "http://127.0.0.1:5000/find-donors"; // <-- replace correctly

    @Autowired
    public BloodService(BloodRepo bloodRepo, SignupRepo signupRepo) {
        this.bloodRepo = bloodRepo;
        this.signupRepo = signupRepo;
        this.restTemplate = new RestTemplate();
    }

    public boolean signup(Signin data) {
        try {
            signupRepo.save(data);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Signin login(Login data) {
        return signupRepo.findByEmailAndPassword(data.getEmail(), data.getPassword());
    }

    public Blood register(Blood data) {
        return bloodRepo.save(data);
    }

    public List<Blood> donors(String bloodGroup) {
        if (bloodGroup != null) {
            return bloodRepo.findByBloodGroupContainingIgnoreCase(bloodGroup);
        } else {
            return bloodRepo.findAll();
        }
    }

    
}
