package com.example.bb.mailservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Existing method to send OTP email
    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }

    // New method to send donation request email to donors
    public void sendDonationRequestEmail(String toEmail, String bloodGroup) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Urgent Blood Donation Request");
        message.setText("Dear Donor,\n\nA request has been made for a " 
                        + bloodGroup + " blood group. Please consider donating if you are eligible.\n\nThank you!");
        mailSender.send(message);
    }
}
