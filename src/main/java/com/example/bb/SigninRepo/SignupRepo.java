package com.example.bb.SigninRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.bb.SLC.Signin;


public interface SignupRepo extends JpaRepository<Signin, Long> {
    Signin findByEmailAndPassword(String email, String password);
}
