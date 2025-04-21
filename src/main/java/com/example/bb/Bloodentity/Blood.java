package com.example.bb.Bloodentity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

@Entity
@Table(name = "blood_donors_register")
public class Blood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private int age;
    private String gender;

    @Column(name = "blood_group")
    private String bloodGroup;

    private String location;

    private String state;
    private String district;
    
    @Column(name = "pin_code")
    private String pinCode;

    @Column(name = "phone_number", unique = true, nullable = false)
    private String phoneNumber;

    private String emailId;

    private double latitude;
    private double longitude;

    @CreationTimestamp
    @Column(name = "registration_date", updatable = false)
    private LocalDate registrationDate;

    private LocalDate lastDonation;

    @Column(nullable = true)
    private boolean availability = true;

    private double healthScore = 10.0;
    private int donationCount = 0;

    public Blood() {}

    @PrePersist
    public void prePersist() {
        if (lastDonation == null) {
            lastDonation = LocalDate.now();
        }
    }

    // Getters and Setters

    public Blood(Long id, String name, LocalDate dob, int age, String gender, String bloodGroup, String location,
			String state, String district, String pinCode, String phoneNumber, String emailId, double latitude,
			double longitude, LocalDate registrationDate, LocalDate lastDonation, boolean availability,
			double healthScore, int donationCount) {
		super();
		this.id = id;
		this.name = name;
		this.dob = dob;
		this.age = age;
		this.gender = gender;
		this.bloodGroup = bloodGroup;
		this.location = location;
		this.state = state;
		this.district = district;
		this.pinCode = pinCode;
		this.phoneNumber = phoneNumber;
		this.emailId = emailId;
		this.latitude = latitude;
		this.longitude = longitude;
		this.registrationDate = registrationDate;
		this.lastDonation = lastDonation;
		this.availability = availability;
		this.healthScore = healthScore;
		this.donationCount = donationCount;
	}

	public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getPinCode() { return pinCode; }
    public void setPinCode(String pinCode) { this.pinCode = pinCode; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public LocalDate getRegistrationDate() { return registrationDate; }

    public LocalDate getLastDonation() { return lastDonation; }
    public void setLastDonation(LocalDate lastDonation) { this.lastDonation = lastDonation; }

    public boolean isAvailability() { return availability; }
    public void setAvailability(boolean availability) { this.availability = availability; }

    public double getHealthScore() { return healthScore; }
    public void setHealthScore(double healthScore) { this.healthScore = healthScore; }

    public int getDonationCount() { return donationCount; }
    public void setDonationCount(int donationCount) { this.donationCount = donationCount; }
}
